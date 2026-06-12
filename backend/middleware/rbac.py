from functools import wraps
from typing import List, Callable
from fastapi import HTTPException, status
from models.domain import User

def require_roles(allowed_roles: List[str]):
    """
    Decorator to enforce RBAC based on allowed roles.
    Expects `current_user: User` to be injected by FastAPI dependency injection system.
    """
    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Try to find current_user in kwargs
            user: User = kwargs.get("current_user")
            
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="current_user not found in dependencies"
                )
                
            print(f"DEBUG RBAC: user.role={user.role}, type={type(user.role)}, allowed={allowed_roles}")
            
            # Handle both Enum and string cases safely
            role_value = user.role.value if hasattr(user.role, 'value') else user.role
            
            if role_value not in allowed_roles:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"You do not have permission to perform this action. Your role: {role_value}"
                )
            
            return await func(*args, **kwargs)
        return wrapper
    return decorator
