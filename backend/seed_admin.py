import asyncio
from database.database import AsyncSessionLocal
from models.domain import User, RoleEnum
from core.security import get_password_hash
from sqlalchemy import select

from database.database import AsyncSessionLocal, engine, Base

async def seed_admin():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as session:
        # Check if admin already exists
        result = await session.execute(select(User).where(User.email == "admin@elsan.com"))
        admin = result.scalar_one_or_none()
        
        
        if not admin:
            admin = User(
                full_name="Super Admin",
                email="admin@elsan.com",
                phone="+910000000000",
                password_hash=get_password_hash("admin123"),
                role=RoleEnum.SUPER_ADMIN,
                is_active=True
            )
            session.add(admin)
            await session.commit()
            print("Super Admin created: admin@elsan.com / admin123")
        else:
            print("Admin already exists.")

        # Check if receptionist exists
        result_recep = await session.execute(select(User).where(User.email == "reception@elsan.com"))
        receptionist = result_recep.scalar_one_or_none()
        
        if not receptionist:
            receptionist = User(
                full_name="Front Desk Reception",
                email="reception@elsan.com",
                phone="+910000000001",
                password_hash=get_password_hash("Recep@Elsan123"),
                role=RoleEnum.RECEPTIONIST,
                is_active=True
            )
            session.add(receptionist)
            await session.commit()
            print("Receptionist created: reception@elsan.com / Recep@Elsan123")
        else:
            print("Receptionist already exists.")

        # Doctor User
        result_doctor = await session.execute(select(User).where(User.email == "doctor_elan@elsan.com"))
        if not result_doctor.scalar_one_or_none():
            doctor = User(
                full_name="Dr. N. Elangeswaran",
                email="doctor_elan@elsan.com",
                phone="+910000000002",
                password_hash=get_password_hash("Dr.Elan@01"),
                role=RoleEnum.DOCTOR,
                is_active=True
            )
            session.add(doctor)
            print("Doctor created: doctor_elan@elsan.com / Dr.Elan@01")
        else:
            print("Doctor already exists.")

        # Nurse User
        result_nurse = await session.execute(select(User).where(User.email == "nurse_head@elsan.com"))
        if not result_nurse.scalar_one_or_none():
            nurse = User(
                full_name="Head Nurse",
                email="nurse_head@elsan.com",
                phone="+910000000003",
                password_hash=get_password_hash("Nurse@Elsan01"),
                role=RoleEnum.NURSE,
                is_active=True
            )
            session.add(nurse)
            print("Nurse created: nurse_head@elsan.com / Nurse@Elsan01")
        else:
            print("Nurse already exists.")

        # Analyst User
        result_analyst = await session.execute(select(User).where(User.email == "analyst@elsan.com"))
        if not result_analyst.scalar_one_or_none():
            analyst = User(
                full_name="Clinic Analytics",
                email="analyst@elsan.com",
                phone="+910000000004",
                password_hash=get_password_hash("Data@Elsan2026"),
                role=RoleEnum.ANALYST,
                is_active=True
            )
            session.add(analyst)
            print("Analyst created: analyst@elsan.com / Data@Elsan2026")
        else:
            print("Analyst already exists.")

        await session.commit()

if __name__ == "__main__":
    asyncio.run(seed_admin())
