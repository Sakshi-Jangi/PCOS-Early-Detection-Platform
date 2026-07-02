from sqlalchemy.orm import Session

from models import UserDB


def update_profile_service(
    data,
    current_user: UserDB,
    db: Session
):

    current_user.name = data.name
    current_user.age = data.age

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile Updated Successfully",
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "age": current_user.age
    }