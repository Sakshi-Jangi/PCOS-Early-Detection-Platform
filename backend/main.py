from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from database import engine
import models

from routes.period import router as period_router
from routes.user import router as user_router
from routes.login import router as login_router
from routes.profile import router as profile_router
from routes.symptom import router as symptom_router
from routes.prediction import router as prediction_router
from routes.dashboard import router as dashboard_router
from routes.analytics import router as analytics_router

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PCOS Early Detection Platform",
    version="1.0.0",
    description="Backend API for the PCOS Early Detection Platform"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers

app.include_router(period_router)
app.include_router(user_router)
app.include_router(login_router)
app.include_router(profile_router)
app.include_router(symptom_router)
app.include_router(prediction_router)
app.include_router(dashboard_router)
app.include_router(analytics_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to PCOS Early Detection Platform"
    }


@app.get("/health")
def health():
    return {
        "status": "Backend Running"
    }


@app.get("/about")
def about():
    return {
        "project": "PCOS Early Detection Platform",
        "version": "1.0.0",
        "purpose": "Early PCOS Risk Assessment",
        "developer": "Sakshi"
    }


@app.get("/test")
def test():
    print("TEST ENDPOINT CALLED")
    return {"message": "working"}