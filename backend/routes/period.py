from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from schemas import Period
from services.period_service import (
    add_period_service,
    get_periods_service,
)
from dependencies import get_db
from dependencies_auth import get_current_user
from models import UserDB

router = APIRouter()


@router.post("/period")
def add_period(
    period: Period,
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user)
):
    return add_period_service(
        period,
        current_user,
        db
    )


@router.get("/periods")
def get_periods(
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user)
):
    return get_periods_service(
        current_user,
        db
    )