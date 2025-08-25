from sqlalchemy.orm import Session
from models import Pokemon  # assuming your SQLAlchemy model is named Pokemon
from schemas.pokemon import PokemonCreate, PokemonUpdate

def get_pokemon_by_id(db: Session, pokemon_id: int) -> Pokemon | None:
    return db.query(Pokemon).filter(Pokemon.id == pokemon_id).first()

def get_pokemons_by_user(db: Session, user_id: int) -> list[Pokemon]:
    return db.query(Pokemon).filter(Pokemon.user_id == user_id).all()

def create_pokemon(db: Session, user_id: int, pokemon_data: PokemonCreate) -> Pokemon:
    new_pokemon = Pokemon(user_id=user_id, **pokemon_data.dict())
    db.add(new_pokemon)
    db.commit()
    db.refresh(new_pokemon)
    return new_pokemon

def update_pokemon(db: Session, pokemon_id: int, update_data: PokemonUpdate) -> Pokemon | None:
    pokemon = get_pokemon_by_id(db, pokemon_id)
    if not pokemon:
        return None
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(pokemon, key, value)
    db.commit()
    db.refresh(pokemon)
    return pokemon

def delete_pokemon(db: Session, pokemon_id: int) -> bool:
    pokemon = get_pokemon_by_id(db, pokemon_id)
    if not pokemon:
        return False
    db.delete(pokemon)
    db.commit()
    return True

def list_all_pokemons(db: Session, skip: int = 0, limit: int = 100) -> list[Pokemon]:
    return db.query(Pokemon).offset(skip).limit(limit).all()