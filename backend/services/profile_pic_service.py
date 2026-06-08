import uuid
from fastapi import UploadFile, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from models.domain import Doctor
from services.cloudinary_service import upload_file, delete_file
from services.audit_service import AuditService

class ProfilePicService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.audit = AuditService(db)

    async def upload_profile_picture(self, doctor_id: uuid.UUID, file: UploadFile, user_id: uuid.UUID) -> Doctor:
        result = await self.db.execute(select(Doctor).options(selectinload(Doctor.user)).where(Doctor.id == doctor_id))
        doctor = result.scalar_one_or_none()
        if not doctor:
            raise HTTPException(status_code=404, detail="Doctor not found")

        if doctor.profile_pic_public_id:
            delete_file(doctor.profile_pic_public_id)

        upload_result = await upload_file(file, folder="elsan-clinic/doctor-profile-pics")
        
        doctor.profile_pic_url = upload_result["url"]
        doctor.profile_pic_public_id = upload_result["public_id"]
        
        await self.db.commit()
        await self.db.refresh(doctor)
        
        await self.audit.log_event(
            user_id=user_id,
            action="UPLOAD_PROFILE_PIC",
            entity_type="DOCTOR",
            entity_id=doctor.id,
            details=f"Uploaded profile pic {upload_result['public_id']}"
        )
        
        return doctor

    async def delete_profile_picture(self, doctor_id: uuid.UUID, user_id: uuid.UUID) -> bool:
        result = await self.db.execute(select(Doctor).where(Doctor.id == doctor_id))
        doctor = result.scalar_one_or_none()
        if not doctor or not doctor.profile_pic_public_id:
            return False

        delete_file(doctor.profile_pic_public_id)
        doctor.profile_pic_url = None
        doctor.profile_pic_public_id = None
        
        await self.db.commit()
        
        await self.audit.log_event(
            user_id=user_id,
            action="DELETE_PROFILE_PIC",
            entity_type="DOCTOR",
            entity_id=doctor_id
        )
        
        return True
