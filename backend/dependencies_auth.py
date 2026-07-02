from fastapi import Depends
from sqlalchemy.orm import Session

from oauth2 import oauth2_scheme
from security import verify_access_token
from dependencies import get_db
from models import UserDB


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    email = verify_access_token(token)

    user = db.query(UserDB).filter(
        UserDB.email == email
    ).first()

    return user