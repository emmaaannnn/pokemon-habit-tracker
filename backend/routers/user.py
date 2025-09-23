from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import UserCreate, UserUpdate, UserRead
from backend.services.user_service import (
    create_user,
    get_user_by_id_service,
    update_user_service,
    delete_user_service,
    list_users_service
)

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserRead)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    user = create_user(db, user_data)
    return user

@router.get("/{user_id}", response_model=UserRead)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id_service(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserRead)
def update_user(user_id: int, update_data: UserUpdate, db: Session = Depends(get_db)):
    user = update_user_service(db, user_id, update_data)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    success = delete_user_service(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": f"User {user_id} deleted successfully."}

@router.get("/", response_model=list[UserRead])
def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return list_users_service(db, skip, limit)