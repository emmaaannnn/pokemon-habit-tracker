from pydantic import BaseModel
from typing import Optional

class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    cost: int
    effect_type: Optional[str] = None  # e.g. "xp_boost", "catch_rate", etc.
    effect_value: Optional[float] = 1.0  # e.g. 1.5 for 50% boost

class ItemCreate(ItemBase):
    pass

class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    cost: Optional[int] = None
    effect_type: Optional[str] = None
    effect_value: Optional[float] = None  # e.g. 1.5 for 50% boost  

class ItemRead(ItemBase):
    id: int

    class Config:
        orm_mode = True