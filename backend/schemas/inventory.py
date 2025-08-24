from pydantic import BaseModel
from typing import Optional

class InventoryBase(BaseModel):
    item_id: int
    quantity: int

class InventoryCreate(InventoryBase):
    user_id: int

class InventoryUpdate(BaseModel):
    quantity: Optional[int] = None

class InventoryRead(InventoryBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True