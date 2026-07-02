from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from schemas import Symptom
from services.symptom_service import (
    add_symptom_service,
    get_symptoms_service,
)
from dependencies import get_db
from dependencies_auth import get_current_user
from models import UserDB

router = APIRouter()


@router.post("/symptoms")
def add_symptoms(
    symptom: Symptom,
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user)
):
    return add_symptom_service(
        symptom,
        current_user,
        db
    )


@router.get("/symptoms")
def get_symptoms(
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user)
):
    return get_symptoms_service(
        current_user,
        db
    )