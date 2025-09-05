from backend.repositories.item_repository import get_item_by_name
from backend.repositories.inventory_repository import create_inventory_item

def reward_level_100(db: Session, user_id: int):
    legendary = get_item_by_name(db, "Legendary Ticket")
    shiny = get_item_by_name(db, "Shiny Candy")

    if legendary:
        create_inventory_item(
            db,
            inventory_data=InventoryCreate(user_id=user_id, item_id=legendary.id, quantity=1),
            item_name=legendary.name
        )

    if shiny:
        create_inventory_item(
            db,
            inventory_data=InventoryCreate(user_id=user_id, item_id=shiny.id, quantity=1),
            item_name=shiny.name
        )