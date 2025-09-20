from sqlalchemy.orm import Session
from backend.models import Pokemon
from backend.schemas.pokemon import PokemonCreate, PokemonUpdate
from backend.repositories.pokemon import (
    create_pokemon,
    update_pokemon,
    get_pokemon_by_id,
    get_user_party,
    get_user_box
)

def create_user_pokemon(db: Session, user_id: int, data: PokemonCreate, name: str, is_shiny: bool = False) -> Pokemon:
    """
    Creates a new Pokémon for the user.
    """
    new_pokemon = Pokemon(
        user_id=user_id,
        name=name,
        nickname=data.nickname,
        level=data.level or 1,
        xp=data.xp or 0,
        is_in_party=data.is_in_party or False,
        is_shiny=is_shiny
    )
    return create_pokemon(db, new_pokemon)

def update_user_pokemon(db: Session, pokemon_id: int, data: PokemonUpdate) -> Pokemon:
    """
    Updates a Pokémon's attributes.
    """
    pokemon = get_pokemon_by_id(db, pokemon_id)
    if not pokemon:
        return None

    for field, value in data.dict(exclude_unset=True).items():
        setattr(pokemon, field, value)

    return update_pokemon(db, pokemon)

def switch_party_status(db: Session, pokemon_id: int, in_party: bool) -> Pokemon:
    """
    Toggles a Pokémon's party status.
    """
    pokemon = get_pokemon_by_id(db, pokemon_id)
    if not pokemon:
        return None

    pokemon.is_in_party = in_party
    return update_pokemon(db, pokemon)

def apply_shiny_status(db: Session, pokemon_id: int) -> Pokemon:
    """
    Makes a Pokémon shiny.
    """
    pokemon = get_pokemon_by_id(db, pokemon_id)
    if not pokemon or pokemon.is_shiny:
        return None

    pokemon.is_shiny = True
    return update_pokemon(db, pokemon)

def get_user_pokemon_party(db: Session, user_id: int) -> list[Pokemon]:
    return get_user_party(db, user_id)

def get_user_pokemon_box(db: Session, user_id: int) -> list[Pokemon]:
    return get_user_box(db, user_id)