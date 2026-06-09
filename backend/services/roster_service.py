from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from sqlalchemy.orm import selectinload
from uuid import UUID
from typing import List, Optional
from datetime import date

from models.domain import Roster, User, NotificationType
from schemas.roster import RosterCreate, RosterUpdate, RosterResponse
from schemas.notification import NotificationCreate
from services.notification_service import NotificationService

class RosterService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.notification_service = NotificationService(db)

    async def _attach_user_info(self, roster: Roster) -> RosterResponse:
        resp = RosterResponse.model_validate(roster)
        if hasattr(roster, 'user') and roster.user:
            resp.user_name = roster.user.full_name
            resp.user_role = roster.user.role.value
        return resp

    async def create_roster(self, data: RosterCreate, admin_id: UUID) -> RosterResponse:
        db_roster = Roster(
            user_id=data.user_id,
            date=data.date,
            shift_type=data.shift_type,
            start_time=data.start_time,
            end_time=data.end_time,
            notes=data.notes,
            created_by_id=admin_id
        )
        self.db.add(db_roster)
        await self.db.commit()
        await self.db.refresh(db_roster)
        
        # Load user relationship
        result = await self.db.execute(select(Roster).options(selectinload(Roster.user)).where(Roster.id == db_roster.id))
        db_roster = result.scalars().first()

        # Send automatic notification to the user
        await self.notification_service.create_notification(
            NotificationCreate(
                title="New Roster Assigned",
                message=f"You have been assigned a {data.shift_type.value} shift on {data.date.strftime('%b %d, %Y')}.",
                type=NotificationType.ROSTER,
                recipient_id=data.user_id
            )
        )

        return await self._attach_user_info(db_roster)

    async def get_my_rosters(self, user_id: UUID) -> List[RosterResponse]:
        query = select(Roster).options(selectinload(Roster.user)).where(Roster.user_id == user_id).order_by(desc(Roster.date))
        result = await self.db.execute(query)
        rosters = result.scalars().all()
        return [await self._attach_user_info(r) for r in rosters]

    async def get_all_rosters(self, role: Optional[str] = None) -> List[RosterResponse]:
        query = select(Roster).options(selectinload(Roster.user)).join(User, Roster.user_id == User.id).order_by(desc(Roster.date))
        if role:
            query = query.where(User.role == role)
            
        result = await self.db.execute(query)
        rosters = result.scalars().all()
        return [await self._attach_user_info(r) for r in rosters]

    async def update_roster(self, roster_id: UUID, data: RosterUpdate) -> Optional[RosterResponse]:
        result = await self.db.execute(select(Roster).options(selectinload(Roster.user)).where(Roster.id == roster_id))
        db_roster = result.scalars().first()
        
        if not db_roster:
            return None
            
        if data.shift_type: db_roster.shift_type = data.shift_type
        if data.start_time: db_roster.start_time = data.start_time
        if data.end_time: db_roster.end_time = data.end_time
        if data.notes is not None: db_roster.notes = data.notes
        
        await self.db.commit()
        await self.db.refresh(db_roster)
        
        # Load user relationship
        result = await self.db.execute(select(Roster).options(selectinload(Roster.user)).where(Roster.id == db_roster.id))
        db_roster = result.scalars().first()
        
        # Send update notification
        await self.notification_service.create_notification(
            NotificationCreate(
                title="Roster Updated",
                message=f"Your shift on {db_roster.date.strftime('%b %d, %Y')} has been updated.",
                type=NotificationType.ROSTER,
                recipient_id=db_roster.user_id
            )
        )
        
        return await self._attach_user_info(db_roster)

    async def delete_roster(self, roster_id: UUID) -> bool:
        result = await self.db.execute(select(Roster).where(Roster.id == roster_id))
        db_roster = result.scalars().first()
        if db_roster:
            await self.db.delete(db_roster)
            await self.db.commit()
            return True
        return False
