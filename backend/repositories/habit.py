from sqlalchemy.orm import Session
from models import Habit, HabitLog
from schemas.habit import HabitCreate, HabitUpdate
from datetime import datetime

def get_habit_by_id(db: Session, habit_id: int) -> Habit | None:
    return db.query(Habit).filter(Habit.id == habit_id).first()

def get_habits_by_user(db: Session, user_id: int) -> list[Habit]:
    return db.query(Habit).filter(Habit.user_id == user_id).all()

def create_habit(db: Session, habit_data: HabitCreate) -> Habit:
    new_habit = Habit(**habit_data.dict())
    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)
    return new_habit

def update_habit(db: Session, habit_id: int, update_data: HabitUpdate) -> Habit | None:
    habit = get_habit_by_id(db, habit_id)
    if not habit:
        return None
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(habit, key, value)
    db.commit()
    db.refresh(habit)
    return habit

def delete_habit(db: Session, habit_id: int) -> bool:
    habit = get_habit_by_id(db, habit_id)
    if not habit:
        return False
    db.delete(habit)
    db.commit()
    return True

def log_habit_completion(db: Session, habit_id: int) -> HabitLog:
    log = HabitLog(habit_id=habit_id, completed_at=datetime.utcnow())
    db.add(log)
    db.commit()
    db.refresh(log)
    return log

def get_habit_logs(db: Session, habit_id: int) -> list[HabitLog]:
    return db.query(HabitLog).filter(HabitLog.habit_id == habit_id).order_by(HabitLog.completed_at.desc()).all()