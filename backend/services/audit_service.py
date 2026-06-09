import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from models.domain import AuditLog

class AuditService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def log_event(self, user_id: uuid.UUID, action: str, entity_type: str, entity_id: uuid.UUID, details: str = None) -> AuditLog:
        """
        Logs a critical action to the database.
        """
        log_entry = AuditLog(
            user_id=user_id,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            details=details
        )
        self.db.add(log_entry)
        await self.db.commit()
        await self.db.refresh(log_entry)
        return log_entry

    async def get_audit_logs(self, limit: int = 50, action: str = None):
        """
        Retrieves recent audit logs, optionally filtered by action,
        with the associated user joined.
        """
        stmt = select(AuditLog).options(joinedload(AuditLog.user)).order_by(AuditLog.timestamp.desc())
        if action:
            stmt = stmt.where(AuditLog.action == action)
        
        stmt = stmt.limit(limit)
        result = await self.db.execute(stmt)
        return result.scalars().all()
