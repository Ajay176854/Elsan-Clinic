import asyncio
from database.database import AsyncSessionLocal
from models.domain import User, Doctor, RoleEnum
from core.security import get_password_hash
from sqlalchemy import select

async def seed():
    async with AsyncSessionLocal() as session:
        doctors_data = [
            {
                "email": "dr_elan2@elsan.com",
                "full_name": "DR. N. ELANGESWARAN",
                "phone": "9444184977",
                "specialization": "General Health Care, Diabetes, Hypertension, Skin Disease, Asthma",
                "qualification": "MBBS, MD Internal Medicine",
                "experience_years": 20,
                "consultation_fee": 500,
                "consultation_timings": "In-Clinic"
            },
            {
                "email": "dr_meena@elsan.com",
                "full_name": "DR. E. PANDIYA MEENA",
                "phone": "7824051677",
                "specialization": "Cardiac Care, Infectious Disease, Geriatric Care, Endocrinology",
                "qualification": "MBBS, MD, Cardiology Fellow",
                "experience_years": 10,
                "consultation_fee": 500,
                "consultation_timings": "Online Consultation Only"
            },
            {
                "email": "dr_ramya@elsan.com",
                "full_name": "DR. E. RAMYASHREE",
                "phone": "9962663033",
                "specialization": "Cardiac Care, Infectious Disease, Evidence-Based Medicine",
                "qualification": "MBBS, MD General Medicine, MBA",
                "experience_years": 5,
                "consultation_fee": 500,
                "consultation_timings": "Online Consultation Only"
            },
            {
                "email": "dr_sambath@elsan.com",
                "full_name": "DR. R. SAMBATH KUMAR",
                "phone": "8220246025",
                "specialization": "Vaccinations, Newborn Care, Nutrition",
                "qualification": "MBBS, MD Paediatrics, DNB",
                "experience_years": 15,
                "consultation_fee": 500,
                "consultation_timings": "In-Clinic"
            }
        ]

        for d_data in doctors_data:
            result = await session.execute(select(User).where(User.email == d_data["email"]))
            user = result.scalar_one_or_none()
            if not user:
                user = User(
                    full_name=d_data["full_name"],
                    email=d_data["email"],
                    phone=d_data["phone"],
                    password_hash=get_password_hash("Doctor@123"),
                    role=RoleEnum.DOCTOR,
                    is_active=True
                )
                session.add(user)
                await session.flush()
            
            # Check if doctor profile exists
            res_doc = await session.execute(select(Doctor).where(Doctor.user_id == user.id))
            doctor = res_doc.scalar_one_or_none()
            if not doctor:
                doctor = Doctor(
                    user_id=user.id,
                    specialization=d_data["specialization"],
                    qualification=d_data["qualification"],
                    experience_years=d_data["experience_years"],
                    consultation_fee=d_data["consultation_fee"],
                    consultation_timings=d_data["consultation_timings"]
                )
                session.add(doctor)
        
        # existing doctor seed check
        res_user = await session.execute(select(User).where(User.email == "doctor_elan@elsan.com"))
        old_user = res_user.scalar_one_or_none()
        if old_user:
            res_doc = await session.execute(select(Doctor).where(Doctor.user_id == old_user.id))
            if not res_doc.scalar_one_or_none():
                doctor = Doctor(
                    user_id=old_user.id,
                    specialization="General Health Care",
                    qualification="MBBS, MD",
                    experience_years=20,
                    consultation_fee=500,
                    consultation_timings="In-Clinic"
                )
                session.add(doctor)

        await session.commit()
        print("Doctors seeded successfully")

if __name__ == '__main__':
    asyncio.run(seed())
