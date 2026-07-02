from sqlalchemy.orm import Session

from models import PeriodDB, UserDB


def add_period_service(period, current_user: UserDB, db: Session):
    db_period = PeriodDB(
        user_id=current_user.id,
        start_date=period.start_date,
        end_date=period.end_date
    )

    db.add(db_period)
    db.commit()
    db.refresh(db_period)

    period_length = (
        db_period.end_date - db_period.start_date
    ).days + 1

    return {
        "message": "Period Added Successfully",
        "period_length": period_length,
        "data": {
            "id": db_period.id,
            "user_id": db_period.user_id,
            "start_date": db_period.start_date,
            "end_date": db_period.end_date
        }
    }
from datetime import date, timedelta


def get_periods_service(current_user: UserDB, db: Session):
    periods = (
        db.query(PeriodDB)
        .filter(PeriodDB.user_id == current_user.id)
        .order_by(PeriodDB.start_date.desc())
        .all()
    )

    if not periods:
        return {
            "history": [],
            "last_period": None,
            "next_period": None,
            "days_remaining": None,
        }

    latest = periods[0]

    period_length = (
        latest.end_date - latest.start_date
    ).days + 1

    next_period = latest.start_date + timedelta(days=28)

    days_remaining = (
        next_period - date.today()
    ).days

    return {
        "history": periods,
        "last_period": latest.start_date,
        "period_length": period_length,
        "next_period": next_period,
        "days_remaining": days_remaining,
    }

def get_periods_service(current_user: UserDB, db: Session):
    periods = (
        db.query(PeriodDB)
        .filter(PeriodDB.user_id == current_user.id)
        .all()
    )

    return periods