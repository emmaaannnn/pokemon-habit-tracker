from pydantic import BaseModel, Field
from typing import Optional

# Base Model
class PokemonBase(BaseModel):
    id
    nickname: Optional[str]
    
# Creeate
class PokemonCreate(PokemonBase):
    pass

# Update
class PokemonUpdate(PokemonBase):
    nickname: Optional[str]
    xp: Optional[int]

# Read
class PokemonRead(PokemonBase):
    id: int
    xp: int
    level: int
    
    class Config:
        orm_mode = True