from fastapi import HTTPException, status
from core.security import get_password_hash, verify_password
from repositories.staff import StaffRepository
from schemas.staff import StaffCreate, StaffUpdate
from models.domain import User, RoleEnum

class StaffService:
    def __init__(self, repo: StaffRepository):
        self.repo = repo

    async def create_staff(self, data: StaffCreate) -> User:
        if await self.repo.get_by_email(data.email):
            raise HTTPException(status_code=400, detail="Email already registered")
        if await self.repo.get_by_phone(data.phone):
            raise HTTPException(status_code=400, detail="Phone already registered")

        user = User(
            full_name=data.full_name,
            email=data.email,
            phone=data.phone,
            password_hash=get_password_hash(data.password),
            role=RoleEnum(data.role),
            is_active=True
        )
        return await self.repo.create(user)

    async def get_all_staff(self) -> list[User]:
        return await self.repo.get_all_staff()

    async def get_staff(self, user_id: str) -> User:
        staff = await self.repo.get_by_id(user_id)
        if not staff:
            raise HTTPException(status_code=404, detail="Staff not found")
        return staff

    async def update_staff(self, user_id: str, data: StaffUpdate) -> User:
        staff = await self.get_staff(user_id)
        
        if data.email and data.email != staff.email:
            if await self.repo.get_by_email(data.email):
                raise HTTPException(status_code=400, detail="Email already taken")
            staff.email = data.email
            
        if data.phone and data.phone != staff.phone:
            if await self.repo.get_by_phone(data.phone):
                raise HTTPException(status_code=400, detail="Phone already taken")
            staff.phone = data.phone
            
        if data.full_name:
            staff.full_name = data.full_name
            
        return await self.repo.update(staff)

    async def set_active_status(self, user_id: str, is_active: bool) -> User:
        staff = await self.get_staff(user_id)
        staff.is_active = is_active
        return await self.repo.update(staff)

    async def reset_password(self, user_id: str, admin_user: User, admin_password: str, new_password: str) -> User:
        staff = await self.get_staff(user_id)
        
        if not verify_password(admin_password, admin_user.password_hash):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin password")
            
        staff.password_hash = get_password_hash(new_password)
        return await self.repo.update(staff)
