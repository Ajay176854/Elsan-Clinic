from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from datetime import datetime, date, time

from database.database import get_db
from dependencies.auth import get_current_user
from models.domain import User, Appointment, AppointmentStatus

router = APIRouter(prefix="/api/v1/appointments", tags=["Appointment Management"])

@router.get("")
async def get_appointments(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Appointment))
    appointments = result.scalars().all()
    return appointments

@router.post("")
async def create_appointment(
    data: dict,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    new_appt = Appointment(
        patient_id=data.get("patient_id"),
        doctor_id=data.get("doctor_id"),
        appointment_date=datetime.strptime(data.get("appointment_date"), "%Y-%m-%d").date(),
        appointment_time=datetime.strptime(data.get("appointment_time"), "%H:%M").time(),
        status=AppointmentStatus.SCHEDULED,
        notes=data.get("notes")
    )
    db.add(new_appt)
    await db.commit()
    await db.refresh(new_appt)
    return new_appt
