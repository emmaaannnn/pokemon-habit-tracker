from sqlalchemy.orm import Session
from backend.models import User
from backend.schemas import UserCreate, UserUpdate
from backend.repositories.user import (
    get_user_by_id,
    get_user_by_email,
    create_user as create_user_record,
    update_user as update_user_record,
    delete_user as delete_user_record,
    list_users as list_user_records
)

def create_user(db: Session, user_data: UserCreate) -> User:
    return create_user_record(db, user_data)

def get_user_by_id_service(db: Session, user_id: int) -> User | None:
    return get_user_by_id(db, user_id)

def get_user_by_email_service(db: Session, email: str) -> User | None:
    return get_user_by_email(db, email)

def update_user_service(db: Session, user_id: int, update_data: UserUpdate) -> User | None:
    return update_user_record(db, user_id, update_data)

def delete_user_service(db: Session, user_id: int) -> bool:
    return delete_user_record(db, user_id)

def list_users_service(db: Session, skip: int = 0, limit: int = 100) -> list[User]:
    return list_user_records(db, skip, limit)