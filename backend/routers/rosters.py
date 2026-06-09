from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from uuid import UUID

from database.database import get_db
from dependencies.auth import get_current_user
from middleware.rbac import require_roles
from models.domain import User
from schemas.roster import RosterCreate, RosterUpdate, RosterResponse
from services.roster_service import RosterService

router = APIRouter(prefix="/api/v1/rosters", tags=["Rosters"])

def get_roster_service(db: AsyncSession = Depends(get_db)) -> RosterService:
    return RosterService(db)

@router.post("", response_model=RosterResponse)
@require_roles(["SUPER_ADMIN"])
async def create_roster(
    data: RosterCreate,
    current_user: User = Depends(get_current_user),
    service: RosterService = Depends(get_roster_service)
):
    """Super Admin creates a roster assignment."""
    return await service.create_roster(data, current_user.id)

@router.get("", response_model=List[RosterResponse])
@require_roles(["SUPER_ADMIN"])
async def get_all_rosters(
    role: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    service: RosterService = Depends(get_roster_service)
):
    """Super Admin gets all rosters, optionally filtered by role."""
    return await service.get_all_rosters(role)

@router.get("/my", response_model=List[RosterResponse])
async def get_my_rosters(
    current_user: User = Depends(get_current_user),
    service: RosterService = Depends(get_roster_service)
):
    """Staff member gets their own rosters."""
    return await service.get_my_rosters(current_user.id)

@router.put("/{id}", response_model=RosterResponse)
@require_roles(["SUPER_ADMIN"])
async def update_roster(
    id: UUID,
    data: RosterUpdate,
    current_user: User = Depends(get_current_user),
    service: RosterService = Depends(get_roster_service)
):
    """Super Admin updates a roster assignment."""
    result = await service.update_roster(id, data)
    if not result:
        raise HTTPException(status_code=404, detail="Roster not found")
    return result

@router.delete("/{id}")
@require_roles(["SUPER_ADMIN"])
async def delete_roster(
    id: UUID,
    current_user: User = Depends(get_current_user),
    service: RosterService = Depends(get_roster_service)
):
    """Super Admin deletes a roster assignment."""
    success = await service.delete_roster(id)
    if not success:
        raise HTTPException(status_code=404, detail="Roster not found")
    return {"status": "success"}
