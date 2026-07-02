from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from schemas import UserCreate
from services.user_service import register_user_service
from dependencies import get_db

router = APIRouter()


@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    return register_user_service(user, db)