from sqlalchemy.orm import Session
from backend.models import User
from backend.repositories.item import get_item_by_name
from backend.repositories.inventory import add_or_increment_inventory_item

def purchase_item(db: Session, user: User, item_name: str, quantity: int = 1) -> dict:
    """
    Handles item purchase: checks coins, deducts cost, updates inventory.
    """
    item = get_item_by_name(db, item_name)
    if not item:
        return {"error": f"Item '{item_name}' not found."}

    total_cost = item.cost * quantity
    if user.coins < total_cost:
        return {"error": f"Not enough coins. You need {total_cost} but have {user.coins}."}

    # Deduct coins
    user.coins -= total_cost
    db.commit()

    # Add item to inventory
    inventory = add_or_increment_inventory_item(db, user.id, item_name, quantity)

    return {
        "message": f"Purchased {quantity}x {item_name}.",
        "remaining_coins": user.coins,
        "new_quantity": inventory.quantity
    }