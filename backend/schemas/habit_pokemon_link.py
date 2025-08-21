from pydantic import BaseModel, Field

# Base Model
class HabitPokemonLinkBase(BaseModel):

# Creeate
class HabitPokemonLinkCreate(HabitPokemonLinkBase):

# Update
class HabitPokemonLinkUpdate(HabitPokemonLinkBase):

# Read
class HabitPokemonLinkRead(HabitPokemonLinkBase):