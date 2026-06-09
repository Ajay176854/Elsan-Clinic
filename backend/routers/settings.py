from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from database.database import get_db
from dependencies.auth import get_current_user
from middleware.rbac import require_roles
from models.domain import User
from schemas.settings import ClinicSettingsResponse, ClinicSettingsUpdate
from services.settings import SettingsService
from services.audit_service import AuditService

router = APIRouter(prefix="/api/v1/settings", tags=["Settings"])

def get_settings_service(db: AsyncSession = Depends(get_db)) -> SettingsService:
    return SettingsService(db)

@router.get("", response_model=ClinicSettingsResponse)
async def get_settings(
    service: SettingsService = Depends(get_settings_service)
):
    return await service.get_settings()

@router.put("", response_model=ClinicSettingsResponse)
@require_roles(["SUPER_ADMIN"])
async def update_settings(
    data: ClinicSettingsUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    service: SettingsService = Depends(get_settings_service)
):
    settings = await service.update_settings(data)
    
    audit = AuditService(db)
    await audit.log_event(
        user_id=current_user.id,
        action="UPDATE_SETTINGS",
        entity_type="SETTINGS",
        entity_id=current_user.id # Settings has id=1, using user id to track who did it or just use settings.id
    )
    return settings

@router.post("/logo", response_model=ClinicSettingsResponse)
@require_roles(["SUPER_ADMIN"])
async def upload_logo(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    service: SettingsService = Depends(get_settings_service)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
        
    settings = await service.upload_logo(file)
    
    audit = AuditService(db)
    await audit.log_event(
        user_id=current_user.id,
        action="UPLOAD_LOGO",
        entity_type="SETTINGS",
        entity_id=current_user.id
    )
    return settings
