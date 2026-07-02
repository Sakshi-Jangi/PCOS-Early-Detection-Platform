from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from models import UserDB
from auth import verify_password
from security import create_access_token


def login_user_service(
    form_data: OAuth2PasswordRequestForm,
    db: Session
):
    db_user = db.query(UserDB).filter(
        UserDB.email == form_data.username
    ).first()

    if not db_user:
        return {
            "message": "Invalid Email or Password"
        }

    if not verify_password(
        form_data.password,
        db_user.password
    ):
        return {
            "message": "Invalid Email or Password"
        }

    access_token = create_access_token(
        data={
            "sub": db_user.email
        }
    )

    return {
        "message": "Login Successful",
        "access_token": access_token,
        "token_type": "bearer"
    }