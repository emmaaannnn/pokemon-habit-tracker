from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from database import Base

class Inventory(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    item_name = Column(String)
    quantity = Column(Integer, default=0)

    user = relationship("User", back_populates="inventory")