from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

# Base Model
class HabitBase(BaseModel):
    name: str
    frequency_per_week: int

# Creeate
class HabitCreate(HabitBase):
    user_id: int

# Update
class HabitUpdate(HabiitBase):
    # Optional fields for partial updates
    streak_count: Optional[int] = None
    last_completed: Optional[datetime] = None

# Read
class HabitLogRead(BaseModel):
    id: int
    habit_id: int
    completed_at: datetime

    class Config:
        orm_mode = True

class HabitRead(HabitBase):
    id: int
    user_id: int
    streak_count: int
    last_completed: Optional[datetime]
    created_at: datetime
    logs: List[HabitLogRead] = []

    class Config:
        orm_mode = True