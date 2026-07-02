from sqlalchemy.orm import Session

from models import SymptomDB, UserDB


def add_symptom_service(symptom, current_user: UserDB, db: Session):
    db_symptom = SymptomDB(
        user_id=current_user.id,
        date=symptom.date,
        acne=symptom.acne,
        weight_gain=symptom.weight_gain,
        hair_growth=symptom.hair_growth,
        hair_loss=symptom.hair_loss,
        irregular_periods=symptom.irregular_periods,
        mood_swings=symptom.mood_swings,
        fatigue=symptom.fatigue,
        sleep_hours=symptom.sleep_hours,
        exercise_minutes=symptom.exercise_minutes,
        stress_level=symptom.stress_level
    )

    db.add(db_symptom)
    db.commit()
    db.refresh(db_symptom)

    return {
        "message": "Symptoms Added Successfully",
        "data": {
            "id": db_symptom.id,
            "user_id": db_symptom.user_id,
            "date": db_symptom.date,
            "acne": db_symptom.acne,
            "weight_gain": db_symptom.weight_gain,
            "hair_growth": db_symptom.hair_growth,
            "hair_loss": db_symptom.hair_loss,
            "irregular_periods": db_symptom.irregular_periods,
            "mood_swings": db_symptom.mood_swings,
            "fatigue": db_symptom.fatigue,
            "sleep_hours": db_symptom.sleep_hours,
            "exercise_minutes": db_symptom.exercise_minutes,
            "stress_level": db_symptom.stress_level
        }
    }


def get_symptoms_service(current_user: UserDB, db: Session):
    symptoms = (
        db.query(SymptomDB)
        .filter(SymptomDB.user_id == current_user.id)
        .all()
    )

    return symptoms