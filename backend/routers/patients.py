from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import uuid

from database.database import get_db
from dependencies.auth import get_current_user
from models.domain import User, Patient

router = APIRouter(prefix="/api/v1/patients", tags=["Patient Management"])

@router.get("")
async def get_patients(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Patient))
    patients = result.scalars().all()
    return patients

@router.post("")
async def create_patient(
    data: dict,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    code = f"ELS-{str(uuid.uuid4())[:8].upper()}"
    new_patient = Patient(
        patient_code=code,
        full_name=data.get("full_name"),
        age=data.get("age"),
        gender=data.get("gender"),
        phone=data.get("phone"),
        blood_group=data.get("blood_group"),
        address=data.get("address"),
        medical_history=data.get("medical_history")
    )
    db.add(new_patient)
    await db.commit()
    await db.refresh(new_patient)
    return new_patient
