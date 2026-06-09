from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID

from database.database import get_db
from dependencies.auth import get_current_user
from middleware.rbac import require_roles
from models.domain import User, NotificationType
from schemas.notification import NotificationCreate, NotificationBulkCreate, NotificationResponse
from services.notification_service import NotificationService

router = APIRouter(prefix="/api/v1/notifications", tags=["Notifications"])

def get_notification_service(db: AsyncSession = Depends(get_db)) -> NotificationService:
    return NotificationService(db)

@router.get("/my", response_model=List[NotificationResponse])
async def get_my_notifications(
    unread_only: bool = False,
    current_user: User = Depends(get_current_user),
    service: NotificationService = Depends(get_notification_service)
):
    """Get notifications for the currently logged in user."""
    return await service.get_my_notifications(current_user.id, unread_only)

@router.post("/send", response_model=NotificationResponse)
@require_roles(["SUPER_ADMIN"])
async def send_individual_notification(
    data: NotificationCreate,
    current_user: User = Depends(get_current_user),
    service: NotificationService = Depends(get_notification_service)
):
    """Super Admin sends an individual notification."""
    return await service.create_notification(data)

@router.post("/send-bulk")
@require_roles(["SUPER_ADMIN"])
async def send_bulk_notification(
    data: NotificationBulkCreate,
    current_user: User = Depends(get_current_user),
    service: NotificationService = Depends(get_notification_service)
):
    """Super Admin sends a bulk notification."""
    return await service.create_bulk_notification(data.title, data.message, data.type, data.role_target)

@router.put("/{id}/read")
async def mark_notification_read(
    id: UUID,
    current_user: User = Depends(get_current_user),
    service: NotificationService = Depends(get_notification_service)
):
    success = await service.mark_as_read(id, current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"status": "success"}

@router.delete("/{id}")
async def delete_notification(
    id: UUID,
    current_user: User = Depends(get_current_user),
    service: NotificationService = Depends(get_notification_service)
):
    success = await service.delete_notification(id, current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"status": "success"}
