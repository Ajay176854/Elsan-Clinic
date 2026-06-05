import os

dependencies_auth_content = """from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from core.security import decode_token
from database.database import get_db
from models.domain import User, TokenBlacklist
import jwt

def get_token_from_cookie(request: Request) -> str:
    token = request.cookies.get("access_token")
    if not token:
        # Fallback to Authorization header for swagger UI testing
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            return auth_header.split(" ")[1]
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    return token

async def is_token_blacklisted(token: str, db: AsyncSession) -> bool:
    result = await db.execute(select(TokenBlacklist).where(TokenBlacklist.token == token))
    if result.scalars().first():
        return True
    return False

async def get_current_user(token: str = Depends(get_token_from_cookie), db: AsyncSession = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )
    
    if await is_token_blacklisted(token, db):
        raise HTTPException(status_code=401, detail="Token has been revoked")
        
    try:
        payload = decode_token(token)
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        if user_id is None or token_type != "access":
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
        
    import uuid
    try:
        uuid_obj = uuid.UUID(user_id)
    except ValueError:
        raise credentials_exception
        
    result = await db.execute(select(User).where(User.id == uuid_obj))
    user = result.scalars().first()
    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user
"""

routers_auth_content = """from fastapi import APIRouter, Depends, Header, HTTPException, Response, Request
from sqlalchemy.ext.asyncio import AsyncSession
from database.database import get_db
from dependencies.auth import get_current_user, get_token_from_cookie
from models.domain import User
from schemas.auth import LoginRequest, Token, UserResponse, ChangePasswordRequest
from repositories.auth import AuthRepository
from services.auth import AuthService
import os

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

def get_auth_service(db: AsyncSession = Depends(get_db)) -> AuthService:
    return AuthService(AuthRepository(db))

@router.post("/login")
async def login(response: Response, data: LoginRequest, service: AuthService = Depends(get_auth_service)):
    token_data = await service.authenticate_user(data)
    # Set HTTPOnly cookies
    # max_age in seconds
    is_production = os.getenv("ENVIRONMENT", "development") == "production"
    
    response.set_cookie(
        key="access_token",
        value=token_data.access_token,
        httponly=True,
        samesite="lax",
        secure=is_production, 
        max_age=1440 * 60
    )
    response.set_cookie(
        key="refresh_token",
        value=token_data.refresh_token,
        httponly=True,
        samesite="lax",
        secure=is_production,
        max_age=7 * 24 * 60 * 60
    )
    return {"message": "Login successful"}

@router.post("/refresh")
async def refresh_token(
    request: Request,
    response: Response,
    service: AuthService = Depends(get_auth_service)
):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")
        
    token_data = await service.refresh_access_token(refresh_token)
    
    is_production = os.getenv("ENVIRONMENT", "development") == "production"
    response.set_cookie(
        key="access_token",
        value=token_data.access_token,
        httponly=True,
        samesite="lax",
        secure=is_production,
        max_age=1440 * 60
    )
    response.set_cookie(
        key="refresh_token",
        value=token_data.refresh_token,
        httponly=True,
        samesite="lax",
        secure=is_production,
        max_age=7 * 24 * 60 * 60
    )
    return {"message": "Tokens refreshed successfully"}

@router.post("/logout")
async def logout(
    request: Request,
    response: Response,
    service: AuthService = Depends(get_auth_service)
):
    token = request.cookies.get("access_token")
    if token:
        try:
            await service.logout(token)
        except Exception:
            pass # Even if blacklisting fails, we must delete cookies
            
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse(
        id=str(current_user.id),
        full_name=current_user.full_name,
        email=current_user.email,
        phone=current_user.phone,
        role=current_user.role.value if hasattr(current_user.role, 'value') else current_user.role,
        is_active=current_user.is_active
    )

@router.post("/change-password")
async def change_password(
    data: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    service: AuthService = Depends(get_auth_service)
):
    await service.change_password(current_user, data)
    return {"message": "Password updated successfully"}
"""

def update_files():
    with open('backend/dependencies/auth.py', 'w') as f:
        f.write(dependencies_auth_content)
    with open('backend/routers/auth.py', 'w') as f:
        f.write(routers_auth_content)

if __name__ == "__main__":
    update_files()
    print("Backend auth updated for HTTPOnly cookies")
