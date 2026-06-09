from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.domain import ClinicSettings
from schemas.settings import ClinicSettingsUpdate

class SettingsRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_settings(self) -> ClinicSettings:
        result = await self.db.execute(select(ClinicSettings).where(ClinicSettings.id == 1))
        settings = result.scalar_one_or_none()
        
        # Auto-initialize if empty
        if not settings:
            settings = ClinicSettings(id=1)
            self.db.add(settings)
            await self.db.commit()
            await self.db.refresh(settings)
            
        return settings

    async def update_settings(self, data: ClinicSettingsUpdate) -> ClinicSettings:
        settings = await self.get_settings()
        
        settings.clinic_name = data.clinic_name
        settings.email = data.email
        settings.phone = data.phone
        settings.website = data.website
        settings.physical_address = data.physical_address
        settings.google_maps_url = data.google_maps_url
        settings.working_hours_mon_fri = data.working_hours_mon_fri
        settings.working_hours_sat_sun = data.working_hours_sat_sun
        
        await self.db.commit()
        await self.db.refresh(settings)
        return settings

    async def update_logo_url(self, logo_url: str) -> ClinicSettings:
        settings = await self.get_settings()
        settings.logo_url = logo_url
        await self.db.commit()
        await self.db.refresh(settings)
        return settings
