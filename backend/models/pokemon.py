from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base

class Pokemon(Base):
    __tablename__ = "pokemons"

    id = Column(Integer, primary_key=True, index=True)

    nickname = Column(String)
    level = Column(Integer, default=1)
    xp = Column(Integer, default=0)
    is_in_party = Column(Boolean, default=False)
    is_shiny = Column(Boolean, default=False)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="pokemons")

    habits = relationship("HabitPokemonLink", back_populates="pokemon", cascade="all, delete")