from sqlalchemy.orm import Session
from backend.models import HabitPokemonLink
from backend.schemas import HabitPokemonLinkCreate, HabitPokemonLinkUpdate

def get_link_by_id(db: Session, link_id: int) -> HabitPokemonLink | None:
    return db.query(HabitPokemonLink).filter(HabitPokemonLink.id == link_id).first()

def get_links_by_habit_id(db: Session, habit_id: int) -> list[HabitPokemonLink]:
    return db.query(HabitPokemonLink).filter(HabitPokemonLink.habit_id == habit_id).all()

def get_links_by_pokemon_id(db: Session, pokemon_id: int) -> list[HabitPokemonLink]:
    return db.query(HabitPokemonLink).filter(HabitPokemonLink.pokemon_id == pokemon_id).all()

def create_link(db: Session, link_data: HabitPokemonLinkCreate) -> HabitPokemonLink:
    new_link = HabitPokemonLink(**link_data.dict())
    db.add(new_link)
    db.commit()
    db.refresh(new_link)
    return new_link

def update_link(db: Session, link_id: int, update_data: HabitPokemonLinkUpdate) -> HabitPokemonLink | None:
    link = get_link_by_id(db, link_id)
    if not link:
        return None
    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(link, field, value)
    db.commit()
    db.refresh(link)
    return link

def delete_link(db: Session, link_id: int) -> bool:
    link = get_link_by_id(db, link_id)
    if not link:
        return False
    db.delete(link)
    db.commit()
    return True