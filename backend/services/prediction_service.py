import os
from datetime import date

import joblib
import pandas as pd
from sqlalchemy.orm import Session

from models import PredictionDB, UserDB

# ==========================================
# Load Trained Model
# ==========================================

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "model.pkl"
)

model = joblib.load(MODEL_PATH)


# ==========================================
# Prediction Service
# ==========================================

def predict_pcos_service(
    data,
    db: Session,
    current_user: UserDB
):

    features = pd.DataFrame([{
        "Period Length": data.period_length,
        "Cycle Length": data.cycle_length,
        "Age": data.age,
        "Overweight": data.overweight,
        "loss weight gain / weight loss": data.weight_change,
        "irregular or missed periods": data.irregular_periods,
        "Difficulty in conceiving": data.difficulty_conceiving,
        "Hair growth on Chin": data.hair_chin,
        "Hair growth  on Cheeks": data.hair_cheeks,
        "Hair growth Between breasts": data.hair_breasts,
        "Hair growth  on Upper lips ": data.hair_upper_lips,
        "Hair growth in Arms": data.hair_arms,
        "Hair growth on Inner thighs": data.hair_inner_thighs,
        "Acne or skin tags": data.acne,
        "Hair thinning or hair loss ": data.hair_loss,
        "Dark patches": data.dark_patches,
        "always tired": data.always_tired,
        "more Mood Swings": data.mood_swings,
        "exercise per week": data.exercise,
        "eat outside per week": data.eat_outside,
        "canned food often": data.canned_food,
        "relocated city": data.relocated_city
    }])

    prediction = model.predict(features)[0]

    probability = model.predict_proba(features)[0]

    confidence = float(round(max(probability) * 100, 2))

    if prediction == 1:
        result = "High Risk of PCOS"
    else:
        result = "Low Risk of PCOS"

    # ==========================================
    # Save Prediction
    # ==========================================

    prediction_entry = PredictionDB(
        user_id=current_user.id,
        prediction=result,
        confidence=confidence,
        created_at=date.today()
    )

    db.add(prediction_entry)
    db.commit()

    return {
        "prediction": result,
        "confidence": confidence
    }


# ==========================================
# Prediction History Service
# ==========================================

def get_prediction_history_service(
    db: Session,
    current_user: UserDB
):

    predictions = (
        db.query(PredictionDB)
        .filter(PredictionDB.user_id == current_user.id)
        .order_by(PredictionDB.created_at.desc())
        .all()
    )

    return predictions