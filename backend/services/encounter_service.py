from sqlalchemy.orm import Session
from backend.services.pokemon_service import create_user_pokemon
from backend.utils.wild_encounter import (
    generate_random_pokemon,
    generate_legendary_encounter,
    generate_mythical_encounter
)

def trigger_wild_encounter(db: Session, user_id: int) -> dict:
    """
    Generates a wild encounter and creates the Pokémon for the user.
    """
    encounter = generate_random_pokemon()
    pokemon = create_user_pokemon(
        db=db,
        user_id=user_id,
        data={},  # No nickname or party status at spawn
        name=encounter["name"],
        is_shiny=encounter["is_shiny"]
    )

    return {
        "message": f"You encountered a wild {pokemon.name}!",
        "level": pokemon.level,
        "is_shiny": pokemon.is_shiny,
        "pokemon_id": pokemon.id
    }

def trigger_legendary_encounter(db: Session, user_id: int) -> dict:
    """
    Generates a legendary encounter and creates the Pokémon.
    Requires Legendary Ticket (check logic elsewhere).
    """
    encounter = generate_legendary_encounter()
    pokemon = create_user_pokemon(
        db=db,
        user_id=user_id,
        data={},
        name=encounter["name"],
        is_shiny=encounter["is_shiny"]
    )

    return {
        "message": f"A legendary {pokemon.name} has appeared!",
        "level": pokemon.level,
        "is_shiny": pokemon.is_shiny,
        "pokemon_id": pokemon.id
    }

def trigger_mythical_encounter(db: Session, user_id: int) -> dict:
    """
    Generates a mythical encounter and creates the Pokémon.
    Could be tied to special events or items.
    """
    encounter = generate_mythical_encounter()
    pokemon = create_user_pokemon(
        db=db,
        user_id=user_id,
        data={},
        name=encounter["name"],
        is_shiny=encounter["is_shiny"]
    )

    return {
        "message": f"A mythical {pokemon.name} has appeared!",
        "level": pokemon.level,
        "is_shiny": pokemon.is_shiny,
        "pokemon_id": pokemon.id
    }