from pydantic import BaseModel
from typing import Optional

# Base schema
class HabitPokemonLinkBase(BaseModel):
    habit_id: int
    pokemon_id: int

# Create schema
class HabitPokemonLinkCreate(HabitPokemonLinkBase):
    pass

# Update schema (optional fields for patching)
class HabitPokemonLinkUpdate(BaseModel):
    habit_id: Optional[int] = None
    pokemon_id: Optional[int] = None

# Read schema
class HabitPokemonLinkRead(HabitPokemonLinkBase):
    id: int
    habit: Optional[HabitRead]
    pokemon: Optional[PokemonRead]

    class Config:
        orm_mode = True