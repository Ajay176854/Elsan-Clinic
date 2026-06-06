from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from core.config import settings

connect_args = {"statement_cache_size": 0} if "postgresql" in settings.DATABASE_URL else {}
engine = create_async_engine(
    settings.DATABASE_URL, 
    echo=False, 
    connect_args=connect_args
)
AsyncSessionLocal = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
