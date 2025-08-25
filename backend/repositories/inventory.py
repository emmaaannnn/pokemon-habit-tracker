from sqlalchemy.orm import Session
from models import Inventory
from schemas import InventoryCreate, InventoryUpdate

def get_inventory_by_id(db: Session, inventory_id: int) -> Inventory | None:
    return db.query(Inventory).filter(Inventory.id == inventory_id).first()

def get_inventory_by_user(db: Session, user_id: int) -> list[Inventory]:
    return db.query(Inventory).filter(Inventory.user_id == user_id).all()

def get_inventory_by_item_name(db: Session, user_id: int, item_name: str) -> Inventory | None:
    return db.query(Inventory).filter(
        Inventory.user_id == user_id,
        Inventory.item_name == item_name
    ).first()

def create_inventory_item(db: Session, inventory_data: InventoryCreate, item_name: str) -> Inventory:
    new_inventory = Inventory(
        user_id=inventory_data.user_id,
        item_name=item_name,
        quantity=inventory_data.quantity
    )
    db.add(new_inventory)
    db.commit()
    db.refresh(new_inventory)
    return new_inventory

def update_inventory_item(db: Session, inventory_id: int, update_data: InventoryUpdate) -> Inventory | None:
    inventory = get_inventory_by_id(db, inventory_id)
    if not inventory:
        return None
    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(inventory, field, value)
    db.commit()
    db.refresh(inventory)
    return inventory

def delete_inventory_item(db: Session, inventory_id: int) -> bool:
    inventory = get_inventory_by_id(db, inventory_id)
    if not inventory:
        return False
    db.delete(inventory)
    db.commit()
    return True