from sqlalchemy.orm import Session
from backend.models import Item, Inventory, Pokemon
from backend.services.pokemon_service import apply_shiny_status
from backend.repositories.inventory import get_inventory_item, consume_inventory_item

def use_shiny_candy(db: Session, user_id: int, pokemon_id: int) -> dict:
    """
    Applies shiny candy to a Pokémon and consumes the item.
    """
    inventory_item = get_inventory_item(db, user_id, "Shiny Candy")
    if not inventory_item or inventory_item.quantity < 1:
        return {"error": "You don't have a Shiny Candy."}

    pokemon = apply_shiny_status(db, pokemon_id)
    if not pokemon:
        return {"error": "Invalid Pokémon or already shiny."}

    consume_inventory_item(db, inventory_item)
    return {
        "message": f"{pokemon.name} is now shiny!",
        "pokemon_id": pokemon.id,
        "is_shiny": pokemon.is_shiny
    }

def use_xp_boost_item(db: Session, user_id: int, pokemon: Pokemon, item_name: str, xp_amount: int) -> dict:
    """
    Applies XP boost to a Pokémon and consumes the item.
    """
    inventory_item = get_inventory_item(db, user_id, item_name)
    if not inventory_item or inventory_item.quantity < 1:
        return {"error": f"You don't have a {item_name}."}

    from backend.services.xp_service import apply_xp_to_pokemon
    apply_xp_to_pokemon(db, pokemon, xp_amount)
    consume_inventory_item(db, inventory_item)

    return {
        "message": f"{pokemon.name} gained {xp_amount} XP!",
        "new_level": pokemon.level,
        "pokemon_id": pokemon.id
    }