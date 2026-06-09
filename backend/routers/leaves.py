from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from uuid import UUID

from database.database import get_db
from dependencies.auth import get_current_user
from middleware.rbac import require_roles
from models.domain import User, LeaveStatus
from schemas.leave import LeaveRequestCreate, LeaveRequestUpdate, LeaveRequestResponse
from services.leave_service import LeaveService

router = APIRouter(prefix="/api/v1/leave-requests", tags=["Leaves"])

def get_leave_service(db: AsyncSession = Depends(get_db)) -> LeaveService:
    return LeaveService(db)

@router.post("", response_model=LeaveRequestResponse)
async def create_leave_request(
    data: LeaveRequestCreate,
    current_user: User = Depends(get_current_user),
    service: LeaveService = Depends(get_leave_service)
):
    """Staff member applies for leave."""
    return await service.create_leave_request(data, current_user.id)

@router.get("", response_model=List[LeaveRequestResponse])
@require_roles(["SUPER_ADMIN"])
async def get_all_leave_requests(
    leave_status: Optional[LeaveStatus] = None,
    current_user: User = Depends(get_current_user),
    service: LeaveService = Depends(get_leave_service)
):
    """Super Admin views all leave requests."""
    return await service.get_all_leave_requests(leave_status)

@router.get("/my", response_model=List[LeaveRequestResponse])
async def get_my_leave_requests(
    current_user: User = Depends(get_current_user),
    service: LeaveService = Depends(get_leave_service)
):
    """Staff member views their own leave requests."""
    return await service.get_my_leave_requests(current_user.id)

@router.put("/{id}/approve", response_model=LeaveRequestResponse)
@require_roles(["SUPER_ADMIN"])
async def approve_leave_request(
    id: UUID,
    current_user: User = Depends(get_current_user),
    service: LeaveService = Depends(get_leave_service)
):
    """Super Admin approves a leave request."""
    result = await service.update_leave_status(id, LeaveStatus.APPROVED, current_user.id)
    if not result:
        raise HTTPException(status_code=404, detail="Leave request not found")
    return result

@router.put("/{id}/reject", response_model=LeaveRequestResponse)
@require_roles(["SUPER_ADMIN"])
async def reject_leave_request(
    id: UUID,
    current_user: User = Depends(get_current_user),
    service: LeaveService = Depends(get_leave_service)
):
    """Super Admin rejects a leave request."""
    result = await service.update_leave_status(id, LeaveStatus.REJECTED, current_user.id)
    if not result:
        raise HTTPException(status_code=404, detail="Leave request not found")
    return result
