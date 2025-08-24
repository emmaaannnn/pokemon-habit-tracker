from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base

class HabitPokemonLink(Base):
    __tablename__ = "habit_pokemon_link"

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id"))
    pokemon_id = Column(Integer, ForeignKey("pokemons.id"))

    habit = relationship("Habit", back_populates="pokemons")
    pokemon = relationship("Pokemon", back_populates="habits")