from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update, desc, or_
from uuid import UUID
from typing import List, Optional

from models.domain import Notification, NotificationType, User
from schemas.notification import NotificationCreate, NotificationResponse

class NotificationService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_notification(self, data: NotificationCreate) -> NotificationResponse:
        db_notif = Notification(
            title=data.title,
            message=data.message,
            type=data.type,
            recipient_id=data.recipient_id
        )
        self.db.add(db_notif)
        await self.db.commit()
        await self.db.refresh(db_notif)
        return NotificationResponse.model_validate(db_notif)

    async def create_bulk_notification(self, title: str, message: str, notif_type: NotificationType, role_target: Optional[str] = None):
        # role_target can be "ALL", "DOCTOR", "NURSE", "RECEPTIONIST"
        query = select(User).where(User.is_active == True)
        if role_target and role_target != "ALL":
            query = query.where(User.role == role_target)
            
        result = await self.db.execute(query)
        users = result.scalars().all()
        
        for user in users:
            self.db.add(Notification(
                title=title,
                message=message,
                type=notif_type,
                recipient_id=user.id
            ))
        
        await self.db.commit()
        return {"status": "success", "count": len(users)}

    async def get_my_notifications(self, user_id: UUID, unread_only: bool = False) -> List[NotificationResponse]:
        query = select(Notification).where(
            or_(Notification.recipient_id == user_id, Notification.recipient_id.is_(None))
        ).order_by(desc(Notification.created_at))
        
        if unread_only:
            query = query.where(Notification.is_read == False)
            
        result = await self.db.execute(query)
        notifs = result.scalars().all()
        return [NotificationResponse.model_validate(n) for n in notifs]

    async def mark_as_read(self, notif_id: UUID, user_id: UUID):
        # Note: broadcast notifications (recipient_id=None) are hard to track 'read' state per user without a junction table.
        # For simplicity in MVP, we update the main notification, but broadcast notifications might not be cleanly markable per user.
        # Actually, if it's a broadcast, marking it read marks it read for everyone. To avoid this, broadcast messages should be converted to individual messages upon creation using create_bulk_notification instead.
        query = select(Notification).where(Notification.id == notif_id, Notification.recipient_id == user_id)
        result = await self.db.execute(query)
        notif = result.scalars().first()
        if notif:
            notif.is_read = True
            await self.db.commit()
            return True
        return False
        
    async def delete_notification(self, notif_id: UUID, user_id: UUID):
        query = select(Notification).where(Notification.id == notif_id, Notification.recipient_id == user_id)
        result = await self.db.execute(query)
        notif = result.scalars().first()
        if notif:
            await self.db.delete(notif)
            await self.db.commit()
            return True
        return False
