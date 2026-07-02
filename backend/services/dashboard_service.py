from sqlalchemy.orm import Session
from datetime import timedelta

from models import (
    UserDB,
    PeriodDB,
    PredictionDB
)


# ==========================================
# Dashboard Service
# ==========================================

def get_dashboard_service(
    db: Session,
    current_user: UserDB
):

    # Total Predictions
    total_predictions = (
        db.query(PredictionDB)
        .filter(
            PredictionDB.user_id == current_user.id
        )
        .count()
    )

    # Latest Prediction
    latest_prediction = (
        db.query(PredictionDB)
        .filter(
            PredictionDB.user_id == current_user.id
        )
        .order_by(
             PredictionDB.id.desc()
        )
        .first()
    )

    # Latest Period
    latest_period = (
        db.query(PeriodDB)
        .filter(
            PeriodDB.user_id == current_user.id
        )
        .order_by(
            PeriodDB.start_date.desc()
        )
        .first()
    )
    return {
    "name": current_user.name,
    "age": current_user.age,

    "total_predictions": total_predictions,

    "last_prediction":
        latest_prediction.prediction
        if latest_prediction else None,

    "last_confidence":
        latest_prediction.confidence
        if latest_prediction else None,

    "last_prediction_date":
        latest_prediction.created_at
        if latest_prediction else None,

    "last_period": latest_period,

    "next_expected_period":
        latest_period.start_date +
        timedelta(days=28)
        if latest_period else None
}

    