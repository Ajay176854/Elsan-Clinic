from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import date, time, datetime
from uuid import UUID
from models.domain import ShiftType

class RosterBase(BaseModel):
    user_id: UUID
    date: date
    shift_type: ShiftType
    start_time: time
    end_time: time
    notes: Optional[str] = None

class RosterCreate(RosterBase):
    pass

class RosterUpdate(BaseModel):
    shift_type: Optional[ShiftType] = None
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    notes: Optional[str] = None

class RosterResponse(RosterBase):
    id: UUID
    created_by_id: Optional[UUID] = None
    created_at: datetime
    updated_at: datetime
    
    # We will attach user names for display on the frontend
    user_name: Optional[str] = None
    user_role: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
