from pydantic import BaseModel, Field

# Base Model
class HabitBase(BaseModel):

# Creeate
class HabitCreate(HabitBase):

# Update
class HabitUpdate(HabiitBase):

# Read
class HabitRead(HabitBase):