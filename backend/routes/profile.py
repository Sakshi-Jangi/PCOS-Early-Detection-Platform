from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from dependencies import get_db
from dependencies_auth import get_current_user

from models import UserDB
from schemas import UserUpdate

from services.profile_service import update_profile_service

router = APIRouter()


# ==========================================
# Get Profile
# ==========================================

@router.get("/me")
def get_profile(
    current_user: UserDB = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "age": current_user.age
    }


# ==========================================
# Update Profile
# ==========================================

@router.put("/me")
def update_profile(
    data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: UserDB = Depends(get_current_user)
):
    return update_profile_service(
        data,
        current_user,
        db
    )