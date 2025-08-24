from pydantic import BaseModel, Field
from typing import Optional, List
from app.schemas.pokemon import PokemonRead  # Assuming you have this

# Base Model
class PartyBase(BaseModel):
    user_id: int

# Create
class PartyCreate(PartyBase):
    pass

# Update
class PartyUpdate(BaseModel):
    user_id: Optional[int] = None

# Read
class PartyRead(PartyBase):
    id: int
    pokemons: List[PokemonRead] = []

    class Config:
        orm_mode = True