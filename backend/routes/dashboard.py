from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from dependencies import get_db
from dependencies_auth import get_current_user
from models import UserDB

from schemas import DashboardResponse

from services.dashboard_service import (
    get_dashboard_service
)

router = APIRouter()


# ==========================================
# Dashboard
# ==========================================

@router.get(
    "/dashboard",
    response_model=DashboardResponse
)
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user)
):

    return get_dashboard_service(
        db=db,
        current_user=current_user
    )