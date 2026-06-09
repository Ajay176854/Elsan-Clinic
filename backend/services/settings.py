from sqlalchemy.ext.asyncio import AsyncSession
from repositories.settings import SettingsRepository
from schemas.settings import ClinicSettingsUpdate
from services.cloudinary_service import upload_bytes
from fastapi import UploadFile

class SettingsService:
    def __init__(self, db: AsyncSession):
        self.repo = SettingsRepository(db)

    async def get_settings(self):
        return await self.repo.get_settings()

    async def update_settings(self, data: ClinicSettingsUpdate):
        return await self.repo.update_settings(data)

    async def upload_logo(self, file: UploadFile):
        file_bytes = await file.read()
        upload_result = await upload_bytes(file_bytes, "elsan-clinic/settings", "clinic_logo")
        return await self.repo.update_logo_url(upload_result["url"])
