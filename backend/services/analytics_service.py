from sqlalchemy.orm import Session
from sqlalchemy import func

from models import PredictionDB, UserDB


# ==========================================
# Analytics Service
# ==========================================

def get_analytics_service(
    db: Session,
    current_user: UserDB
):

    # --------------------------------------
    # Total Predictions
    # --------------------------------------
    total_predictions = (
        db.query(PredictionDB)
        .filter(
            PredictionDB.user_id == current_user.id
        )
        .count()
    )

    # --------------------------------------
    # High Risk Count
    # --------------------------------------
    high_risk = (
        db.query(PredictionDB)
        .filter(
            PredictionDB.user_id == current_user.id,
            PredictionDB.prediction == "High Risk of PCOS"
        )
        .count()
    )

    # --------------------------------------
    # Low Risk Count
    # --------------------------------------
    low_risk = (
        db.query(PredictionDB)
        .filter(
            PredictionDB.user_id == current_user.id,
            PredictionDB.prediction == "Low Risk of PCOS"
        )
        .count()
    )

    # --------------------------------------
    # Average Confidence
    # --------------------------------------
    average_confidence = (
        db.query(func.avg(PredictionDB.confidence))
        .filter(
            PredictionDB.user_id == current_user.id
        )
        .scalar()
    )

    if average_confidence is None:
        average_confidence = 0.0
    else:
        average_confidence = round(float(average_confidence), 2)

    # --------------------------------------
    # Latest Prediction
    # --------------------------------------
    latest_prediction = (
        db.query(PredictionDB)
        .filter(
            PredictionDB.user_id == current_user.id
        )
        .order_by(
            PredictionDB.created_at.desc()
        )
        .first()
    )

    # --------------------------------------
    # Prediction History
    # --------------------------------------
    predictions = (
        db.query(PredictionDB)
        .filter(
            PredictionDB.user_id == current_user.id
        )
        .order_by(
            PredictionDB.created_at.asc()
        )
        .all()
    )

    history = [
        {
            "date": prediction.created_at.strftime("%d %b %Y"),
            "created_at": prediction.created_at.isoformat(),
            "prediction": prediction.prediction,
            "confidence": prediction.confidence,
            "status": "Completed",
        }
        for prediction in predictions
    ]

    # --------------------------------------
    # Response
    # --------------------------------------
    return {
        "total_predictions": total_predictions,
        "high_risk": high_risk,
        "low_risk": low_risk,
        "average_confidence": average_confidence,
        "latest_prediction": (
            latest_prediction.prediction
            if latest_prediction
            else None
        ),
        "last_prediction_date": (
            latest_prediction.created_at.strftime("%d %b %Y")
            if latest_prediction
            else None
        ),
        "history": history,
    }