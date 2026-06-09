import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class UserBasicInfo(BaseModel):
    id: uuid.UUID
    full_name: str
    role: str

    class Config:
        from_attributes = True

class AuditLogResponse(BaseModel):
    id: uuid.UUID
    user_id: Optional[uuid.UUID] = None
    action: str
    entity_type: str
    entity_id: uuid.UUID
    details: Optional[str] = None
    timestamp: datetime
    
    # We will join the user table to get this
    user: Optional[UserBasicInfo] = None

    class Config:
        from_attributes = True
