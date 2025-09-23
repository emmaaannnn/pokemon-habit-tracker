from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Party(Base):
    __tablename__ = "parties"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    user = relationship("User", back_populates="party")
    pokemons = relationship("Pokemon", primaryjoin="and_(Party.user_id==Pokemon.user_id, Pokemon.is_in_party==True)")