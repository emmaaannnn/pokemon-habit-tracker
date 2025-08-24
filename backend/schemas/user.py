from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from backend.schemas.habit import HabitRead
from backend.schemas.pokemon import PokemonRead
from backend.schemas.party import PartyRead

## Base schema (shared fields)
class UserBase(BaseModel):
    username: str

# Create schema
class UserCreate(BaseModel):
    username: str

# Update schema (partial updates)
class UserUpdate(BaseModel):
    username: Optional[str] = None

# Read schema (includes nested relationships)
class UserRead(UserBase):
    id: int
    habits: List[HabitRead] = []
    pokemons: List[PokemonRead] = []
    party: Optional[PartyRead] = None

    class Config:
        orm_mode = True
