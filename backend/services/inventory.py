from sqlalchemy.orm import Session
from backend.models import Inventory
from backend.schemas import InventoryCreate, InventoryUpdate
from backend.repositories.inventory import (
    get_inventory_by_user,
    get_inventory_by_item_name,
    create_inventory_item,
    update_inventory_item,
    delete_inventory_item,
    add_or_increment_inventory_item,
    consume_inventory_item
)

def get_user_inventory(db: Session, user_id: int) -> list[Inventory]:
    """
    Returns all inventory items for a user.
    """
    return get_inventory_by_user(db, user_id)

def get_user_item(db: Session, user_id: int, item_name: str) -> Inventory | None:
    """
    Returns a specific item from the user's inventory.
    """
    return get_inventory_by_item_name(db, user_id, item_name)

def add_item_to_inventory(db: Session, user_id: int, item_name: str, quantity: int = 1) -> Inventory:
    """
    Adds or increments an item in the user's inventory.
    """
    return add_or_increment_inventory_item(db, user_id, item_name, quantity)

def use_inventory_item(db: Session, user_id: int, item_name: str, amount: int = 1) -> dict:
    """
    Uses an item from inventory, reducing its quantity.
    """
    inventory = get_inventory_by_item_name(db, user_id, item_name)
    if not inventory or inventory.quantity < amount:
        return {"error": f"You don't have enough {item_name}."}

    updated = consume_inventory_item(db, inventory, amount)
    return {
        "message": f"Used {amount}x {item_name}.",
        "remaining_quantity": updated.quantity if updated else 0
    }

def remove_inventory_item(db: Session, inventory_id: int) -> bool:
    """
    Deletes an inventory item by ID.
    """
    return delete_inventory_item(db, inventory_id)