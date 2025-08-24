from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))

    frequency_per_week = Column(Integer)  # e.g. 3 times/week
    streak_count = Column(Integer, default=0)
    last_completed = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="habits")
    pokemons = relationship("HabitPokemonLink", back_populates="habit", cascade="all, delete")

    logs = relationship("HabitLog", back_populates="habit", cascade="all, delete")