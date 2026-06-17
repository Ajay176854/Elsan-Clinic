from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings

from routers.auth import router as auth_router
from routers.staff import router as staff_router
from routers.doctors import router as doctors_router
from routers.dashboard import router as dashboard_router
from routers.patients import router as patients_router
from routers.appointments import router as appointments_router
from api.medicines.router import router as medicines_router
from api.prescriptions.router import router as prescriptions_router
from api.whatsapp.router import router as whatsapp_router
import asyncio
from contextlib import asynccontextmanager

from routers.visits import router as visits_router
from routers.admissions import router as admissions_router
from routers.settings import router as settings_router
from routers.audit_logs import router as audit_router
from routers.rosters import router as rosters_router
from routers.leaves import router as leaves_router
from routers.notifications import router as notifications_router
from services.cron_scheduler import run_scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Start the background scheduler
    task = asyncio.create_task(run_scheduler())
    yield
    # Shutdown: Cancel the task
    task.cancel()

from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi import Depends, HTTPException, status
import secrets
from fastapi.openapi.docs import get_swagger_ui_html, get_redoc_html
from fastapi.openapi.utils import get_openapi

security = HTTPBasic()

def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, "elsan_api")
    correct_password = secrets.compare_digest(credentials.password, settings.SECRET_KEY[:16])
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

app = FastAPI(
    title="Elsan Clinic Backend API", 
    version="1.0.0", 
    lifespan=lifespan,
    docs_url=None, 
    redoc_url=None, 
    openapi_url=None
)

@app.get("/docs", include_in_schema=False)
async def get_documentation(username: str = Depends(get_current_username)):
    return get_swagger_ui_html(openapi_url="/openapi.json", title="Elsan API Docs")

@app.get("/redoc", include_in_schema=False)
async def get_redocumentation(username: str = Depends(get_current_username)):
    return get_redoc_html(openapi_url="/openapi.json", title="Elsan API Redoc")

@app.get("/openapi.json", include_in_schema=False)
async def openapi(username: str = Depends(get_current_username)):
    return get_openapi(title=app.title, version=app.version, routes=app.routes)

# Enable CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://elsanpublichealth.com",
    "https://www.elsanpublichealth.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:[0-9]+)?|https?://(.*\.)?elsanpublichealth\.com",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi import Request

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

# Include Routers
app.include_router(auth_router)
app.include_router(staff_router)
app.include_router(doctors_router)
app.include_router(dashboard_router)
app.include_router(patients_router)
app.include_router(appointments_router)
app.include_router(medicines_router)
app.include_router(prescriptions_router)
app.include_router(whatsapp_router)
app.include_router(visits_router)
app.include_router(admissions_router)
app.include_router(settings_router)
app.include_router(audit_router)
app.include_router(rosters_router)
app.include_router(leaves_router)
app.include_router(notifications_router)
@app.get("/")
def read_root():
    return {"status": "ok", "message": "Elsan Clinic API is running"}
