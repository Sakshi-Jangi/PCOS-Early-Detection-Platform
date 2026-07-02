from datetime import date
from pydantic import BaseModel, EmailStr


# ==========================================================
# Period Schemas
# ==========================================================

class Period(BaseModel):
    start_date: date
    end_date: date


# ==========================================================
# Symptom Schemas
# ==========================================================

class Symptom(BaseModel):
    date: date

    acne: bool = False
    weight_gain: bool = False
    hair_growth: bool = False
    hair_loss: bool = False
    irregular_periods: bool = False
    mood_swings: bool = False
    fatigue: bool = False

    sleep_hours: int
    exercise_minutes: int
    stress_level: int
# ==========================================================
# User Schemas
# ==========================================================

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    age: int


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    age: int

    class Config:
        from_attributes = True


# NEW
class UserUpdate(BaseModel):
    name: str
    age: int





# ==========================================================
# Login Schemas
# ==========================================================

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# ==========================================================
# Prediction Schemas
# ==========================================================

class PredictionRequest(BaseModel):
    period_length: int
    cycle_length: int
    age: int

    overweight: int
    weight_change: int
    irregular_periods: int
    difficulty_conceiving: int

    hair_chin: int
    hair_cheeks: int
    hair_breasts: int
    hair_upper_lips: int
    hair_arms: int
    hair_inner_thighs: int

    acne: int
    hair_loss: int
    dark_patches: int
    always_tired: int
    mood_swings: int

    exercise: int
    eat_outside: int
    canned_food: int
    relocated_city: int


class PredictionResponse(BaseModel):
    prediction: str
    confidence: float


# ==========================================================
# Prediction History Schemas
# ==========================================================

class PredictionHistoryResponse(BaseModel):
    id: int
    prediction: str
    confidence: float
    created_at: date

    class Config:
        from_attributes = True
# ==========================================================
# Dashboard Schemas
# ==========================================================

class LastPeriodResponse(BaseModel):
    start_date: date
    end_date: date

    class Config:
        from_attributes = True
class DashboardResponse(BaseModel):
    name: str
    age: int

    total_predictions: int

    last_prediction: str | None = None
    last_confidence: float | None = None
    last_prediction_date: date | None = None

    last_period: LastPeriodResponse | None = None

    next_expected_period: date | None = None



# ==========================================================
# Analytics Schemas
# ==========================================================

class PredictionHistory(BaseModel):
    date: str
    created_at: str
    prediction: str
    confidence: float
    status: str


class AnalyticsResponse(BaseModel):
    total_predictions: int
    high_risk: int
    low_risk: int
    average_confidence: float

    latest_prediction: str | None = None
    last_prediction_date: str | None = None

    history: list[PredictionHistory] = []
