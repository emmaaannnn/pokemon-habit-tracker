from sqlalchemy.orm import Session
from backend.repositories.item import list_shop_items

def get_shop_items(db: Session) -> list[dict]:
    """
    Returns all items available in the shop.
    """
    items = list_shop_items(db)
    return [
        {
            "name": item.name,
            "description": item.description,
            "cost": item.cost,
            "rarity": item.rarity
        }
        for item in items
    ]