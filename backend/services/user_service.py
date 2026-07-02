from sqlalchemy.orm import Session

from models import UserDB
from schemas import UserCreate
from auth import hash_password


def register_user_service(user: UserCreate, db: Session):
    existing_user = db.query(UserDB).filter(UserDB.email == user.email).first()

    from fastapi import HTTPException

    if existing_user:
       raise HTTPException(
         status_code=400,
        detail="Email already registered"
    )

    new_user = UserDB(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        age=user.age
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "age": new_user.age
        }
    }