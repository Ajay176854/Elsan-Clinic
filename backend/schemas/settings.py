from pydantic import BaseModel, HttpUrl, EmailStr
from typing import Optional

class ClinicSettingsBase(BaseModel):
    clinic_name: str
    email: str
    phone: str
    website: str
    physical_address: str
    google_maps_url: Optional[str] = None
    working_hours_mon_fri: str
    working_hours_sat_sun: str

class ClinicSettingsUpdate(ClinicSettingsBase):
    pass

class ClinicSettingsResponse(ClinicSettingsBase):
    id: int
    logo_url: Optional[str] = None

    class Config:
        from_attributes = True
