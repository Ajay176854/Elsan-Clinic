from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import date, datetime
from uuid import UUID
from models.domain import LeaveStatus

class LeaveRequestBase(BaseModel):
    leave_type: str
    start_date: date
    end_date: date
    reason: str

class LeaveRequestCreate(LeaveRequestBase):
    pass

class LeaveRequestUpdate(BaseModel):
    status: LeaveStatus

class LeaveRequestResponse(LeaveRequestBase):
    id: UUID
    user_id: UUID
    status: LeaveStatus
    reviewed_by_id: Optional[UUID] = None
    created_at: datetime
    updated_at: datetime
    
    # Attached details for frontend
    user_name: Optional[str] = None
    user_role: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
