from backend.repositories.item import get_item_by_name
from backend.repositories.inventory import add_or_increment_inventory_item

def reward_level_100(db: Session, user_id: int):
    legendary = get_item_by_name(db, "Legendary Ticket")
    shiny = get_item_by_name(db, "Shiny Candy")

    if legendary:
        add_or_increment_inventory_item(db, user_id, legendary.name, amount=1)

    if shiny:
        add_or_increment_inventory_item(db, user_id, shiny.name, amount=1)