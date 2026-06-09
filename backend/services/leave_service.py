from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from sqlalchemy.orm import selectinload
from uuid import UUID
from typing import List, Optional

from models.domain import LeaveRequest, LeaveStatus, NotificationType, User
from schemas.leave import LeaveRequestCreate, LeaveRequestUpdate, LeaveRequestResponse
from schemas.notification import NotificationCreate
from services.notification_service import NotificationService

class LeaveService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.notification_service = NotificationService(db)

    async def _attach_user_info(self, leave: LeaveRequest) -> LeaveRequestResponse:
        resp = LeaveRequestResponse.model_validate(leave)
        if hasattr(leave, 'user') and leave.user:
            resp.user_name = leave.user.full_name
            resp.user_role = leave.user.role.value
        return resp

    async def create_leave_request(self, data: LeaveRequestCreate, user_id: UUID) -> LeaveRequestResponse:
        db_leave = LeaveRequest(
            user_id=user_id,
            leave_type=data.leave_type,
            start_date=data.start_date,
            end_date=data.end_date,
            reason=data.reason,
            status=LeaveStatus.PENDING
        )
        self.db.add(db_leave)
        await self.db.commit()
        await self.db.refresh(db_leave)
        
        # Load user
        result = await self.db.execute(select(LeaveRequest).options(selectinload(LeaveRequest.user)).where(LeaveRequest.id == db_leave.id))
        db_leave = result.scalars().first()
        
        # Notify admins
        await self.notification_service.create_bulk_notification(
            title="New Leave Request",
            message=f"{db_leave.user.full_name} has requested leave from {data.start_date} to {data.end_date}.",
            notif_type=NotificationType.LEAVE,
            role_target="SUPER_ADMIN"
        )
        
        return await self._attach_user_info(db_leave)

    async def get_my_leave_requests(self, user_id: UUID) -> List[LeaveRequestResponse]:
        query = select(LeaveRequest).options(selectinload(LeaveRequest.user)).where(LeaveRequest.user_id == user_id).order_by(desc(LeaveRequest.created_at))
        result = await self.db.execute(query)
        leaves = result.scalars().all()
        return [await self._attach_user_info(l) for l in leaves]

    async def get_all_leave_requests(self, status: Optional[LeaveStatus] = None) -> List[LeaveRequestResponse]:
        query = select(LeaveRequest).options(selectinload(LeaveRequest.user)).order_by(desc(LeaveRequest.created_at))
        if status:
            query = query.where(LeaveRequest.status == status)
            
        result = await self.db.execute(query)
        leaves = result.scalars().all()
        return [await self._attach_user_info(l) for l in leaves]

    async def update_leave_status(self, leave_id: UUID, status: LeaveStatus, admin_id: UUID) -> Optional[LeaveRequestResponse]:
        result = await self.db.execute(select(LeaveRequest).options(selectinload(LeaveRequest.user)).where(LeaveRequest.id == leave_id))
        db_leave = result.scalars().first()
        
        if not db_leave:
            return None
            
        db_leave.status = status
        db_leave.reviewed_by_id = admin_id
        
        await self.db.commit()
        await self.db.refresh(db_leave)
        
        # Load user
        result = await self.db.execute(select(LeaveRequest).options(selectinload(LeaveRequest.user)).where(LeaveRequest.id == db_leave.id))
        db_leave = result.scalars().first()
        
        # Notify the user
        await self.notification_service.create_notification(
            NotificationCreate(
                title=f"Leave Request {status.value}",
                message=f"Your leave request from {db_leave.start_date} to {db_leave.end_date} has been {status.value.lower()}.",
                type=NotificationType.LEAVE,
                recipient_id=db_leave.user_id
            )
        )
        
        return await self._attach_user_info(db_leave)
