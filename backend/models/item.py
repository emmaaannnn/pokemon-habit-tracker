from sqlalchemy import Column, Integer, ForeignKey, String, Float  
from sqlalchemy.orm import relationship
from database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    description = Column(String)
    cost = Column(Integer)
    effect_type = Column(String)  # e.g. "xp_boost", "catch_rate"
    effect_value = Column(Float, default=1.0)