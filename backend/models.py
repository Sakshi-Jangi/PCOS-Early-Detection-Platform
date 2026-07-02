from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey, Float
from database import Base


# ==========================================
# User Table
# ==========================================

class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    age = Column(Integer)


# ==========================================
# Period Table
# ==========================================

class PeriodDB(Base):
    __tablename__ = "periods"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)


# ==========================================
# Symptoms Table
# ==========================================

class SymptomDB(Base):
    __tablename__ = "symptoms"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    date = Column(Date, nullable=False)

    acne = Column(Boolean, default=False)
    weight_gain = Column(Boolean, default=False)
    hair_growth = Column(Boolean, default=False)
    hair_loss = Column(Boolean, default=False)
    irregular_periods = Column(Boolean, default=False)
    mood_swings = Column(Boolean, default=False)
    fatigue = Column(Boolean, default=False)

    sleep_hours = Column(Integer)
    exercise_minutes = Column(Integer)
    stress_level = Column(Integer)


# ==========================================
# Prediction History Table
# ==========================================

class PredictionDB(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    prediction = Column(String, nullable=False)

    confidence = Column(Float, nullable=False)

    created_at = Column(Date, nullable=False)