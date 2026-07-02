from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from dependencies import get_db
from dependencies_auth import get_current_user

from models import UserDB

from schemas import AnalyticsResponse

from services.analytics_service import (
    get_analytics_service
)

router = APIRouter()


# ==========================================
# Analytics
# ==========================================

@router.get(
    "/analytics",
    response_model=AnalyticsResponse
)
def get_analytics(
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user)
):

    return get_analytics_service(
        db=db,
        current_user=current_user
    )