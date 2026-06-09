from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from database.database import get_db
from dependencies.auth import get_current_user
from models.domain import User, RoleEnum
from schemas.audit import AuditLogResponse
from services.audit_service import AuditService

router = APIRouter(prefix="/api/v1/audit-logs", tags=["Audit Logs"])

@router.get("", response_model=List[AuditLogResponse])
async def get_audit_logs(
    limit: int = 50,
    action: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Get recent audit logs. Only accessible by super admins and admins.
    """
    if current_user.role not in [RoleEnum.SUPER_ADMIN.value, RoleEnum.DIRECTOR.value]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to view audit logs"
        )
        
    audit_service = AuditService(db)
    logs = await audit_service.get_audit_logs(limit=limit, action=action)
    return logs
