from pydantic import BaseModel, Field
from typing import Optional

# Base Model
class PokemonBase(BaseModel):
    id
    nickname: Optional[str]
    
# Create
class PokemonCreate(BaseModel):
    nickname: Optional[str] = None
    level: Optional[int] = 1
    xp: Optional[int] = 0
    is_in_party: Optional[bool] = False

# Update
class PokemonUpdate(BaseModel):
    nickname: Optional[str] = None
    xp: Optional[int] = None
    level: Optional[int] = None
    is_in_party: Optional[bool] = None

# Read
class PokemonRead(BaseModel):
    id: int
    nickname: Optional[str]
    level: int
    xp: int
    is_in_party: bool
    user_id: int

    class Config:
        orm_mode = True