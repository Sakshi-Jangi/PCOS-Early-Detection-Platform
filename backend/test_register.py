from database import SessionLocal
from schemas import UserCreate
from services.user_service import register_user_service

db = SessionLocal()

user = UserCreate(
    name="Sakshi",
    email="sakshi_test@gmail.com",
    password="sakshi123",
    age=21
)

print(register_user_service(user, db))