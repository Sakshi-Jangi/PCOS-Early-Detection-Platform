from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from schemas import (
    PredictionRequest,
    PredictionResponse,
    PredictionHistoryResponse
)

from services.prediction_service import (
    predict_pcos_service,
    get_prediction_history_service
)

from dependencies import get_db
from dependencies_auth import get_current_user
from models import UserDB

router = APIRouter()


# ==========================================
# Predict PCOS
# ==========================================

@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(
    data: PredictionRequest,
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user)
):
    return predict_pcos_service(
        data=data,
        db=db,
        current_user=current_user
    )


# ==========================================
# Prediction History
# ==========================================

@router.get(
    "/predictions",
    response_model=List[PredictionHistoryResponse]
)
def get_prediction_history(
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user)
):
    return get_prediction_history_service(
        db=db,
        current_user=current_user
    )