from pydantic import BaseModel, Field
from typing import Optional

# Base Model
class UserBase(BaseModel):
    id: int
    username: str

    habits: Optional[list]
    pokemons: Optional[list]
    party: Optional[dict]

# Creeate
class UserCreate(UserBase):
    pass

# Update
class UserUpdate(UserBase):
    habits: Optional[list]
    pokemons: Optional[list]
    party: Optional[dict]

# Read
class UserRead(UserBase):
    pass
