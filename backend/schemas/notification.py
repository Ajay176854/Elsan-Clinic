from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from uuid import UUID
from models.domain import NotificationType

class NotificationBase(BaseModel):
    title: str
    message: str
    type: NotificationType

class NotificationCreate(NotificationBase):
    recipient_id: Optional[UUID] = None # Null means broadcast to all

class NotificationBulkCreate(NotificationBase):
    role_target: Optional[str] = None # e.g. "DOCTOR", "NURSE", "ALL"

class NotificationResponse(NotificationBase):
    id: UUID
    recipient_id: Optional[UUID] = None
    is_read: bool
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
