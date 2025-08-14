from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)

    habits = relationship("Habit", back_populates="user", cascade="all, delete")
    pokemons = relationship("Pokemon", back_populates="user", cascade="all, delete")
    party = relationship("Party", back_populates="user", uselist=False, cascade="all, delete")