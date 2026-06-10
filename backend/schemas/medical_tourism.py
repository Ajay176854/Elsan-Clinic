from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

class MedicalTourismReportBase(BaseModel):
    patient_name: str
    email: Optional[str] = None
    phone: str
    country: Optional[str] = None
    notes: Optional[str] = None

class MedicalTourismReportCreate(MedicalTourismReportBase):
    pass

class MedicalTourismReportResponse(MedicalTourismReportBase):
    id: UUID
    file_url: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
