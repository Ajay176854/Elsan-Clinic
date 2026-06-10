from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import uuid
import shutil

from database.database import get_db
from models.domain import MedicalTourismReport, MedicalTourismReportStatus
from schemas.medical_tourism import MedicalTourismReportResponse
from dependencies.auth import get_current_user

router = APIRouter(prefix="/api/v1/medical_tourism", tags=["Medical Tourism"])

UPLOAD_DIR = "pdf/medical_tourism"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/reports", response_model=MedicalTourismReportResponse)
async def upload_report(
    patient_name: str = Form(...),
    phone: str = Form(...),
    email: Optional[str] = Form(None),
    country: Optional[str] = Form(None),
    notes: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Save file
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    db_report = MedicalTourismReport(
        patient_name=patient_name,
        phone=phone,
        email=email,
        country=country,
        notes=notes,
        file_url=f"/pdf/medical_tourism/{unique_filename}",
        status=MedicalTourismReportStatus.PENDING
    )
    
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    
    return db_report

@router.get("/reports", response_model=List[MedicalTourismReportResponse])
def get_reports(
    status: Optional[MedicalTourismReportStatus] = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = db.query(MedicalTourismReport)
    if status:
        query = query.filter(MedicalTourismReport.status == status)
    return query.order_by(MedicalTourismReport.created_at.desc()).all()

@router.put("/reports/{report_id}/status", response_model=MedicalTourismReportResponse)
def update_report_status(
    report_id: str,
    status: MedicalTourismReportStatus,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    report = db.query(MedicalTourismReport).filter(MedicalTourismReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
        
    report.status = status
    db.commit()
    db.refresh(report)
    return report
