from sqlalchemy.orm import Session
from models import Item
from schemas import ItemCreate, ItemUpdate

def get_item_by_id(db: Session, item_id: int) -> Item | None:
    return db.query(Item).filter(Item.id == item_id).first()

def get_item_by_name(db: Session, name: str) -> Item | None:
    return db.query(Item).filter(Item.name == name).first()

def get_all_items(db: Session) -> list[Item]:
    return db.query(Item).all()

def create_item(db: Session, item_data: ItemCreate) -> Item:
    new_item = Item(**item_data.dict())
    db.add(new_item)
    
    db.commit()
    db.refresh(new_item)
    return new_item

def update_item(db: Session, item_id: int, item_data: ItemUpdate) -> Item | None:
    item = get_item_by_id(db, item_id)
    if not item:
        return None
    for field, value in item_data.dict(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item

def delete_item(db: Session, item_id: int) -> bool:
    item = get_item_by_id(db, item_id)
    if not item:
        return False
    db.delete(item)
    db.commit()
    return True