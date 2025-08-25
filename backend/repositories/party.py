from sqlalchemy.orm import Session
from backend.models import Party
from backend.schemas import PartyCreate, PartyUpdate

def get_party_by_id(db: Session, party_id: int) -> Party | None:
    return db.query(Party).filter(Party.id == party_id).first()

def get_party_by_user_id(db: Session, user_id: int) -> Party | None:
    return db.query(Party).filter(Party.user_id == user_id).first()

def create_party(db: Session, party_data: PartyCreate) -> Party:
    new_party = Party(user_id=party_data.user_id)
    db.add(new_party)
    db.commit()
    db.refresh(new_party)
    return new_party

def update_party(db: Session, party_id: int, update_data: PartyUpdate) -> Party | None:
    party = get_party_by_id(db, party_id)
    if not party:
        return None
    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(party, field, value)
    db.commit()
    db.refresh(party)
    return party

def delete_party(db: Session, party_id: int) -> bool:
    party = get_party_by_id(db, party_id)
    if not party:
        return False
    db.delete(party)
    db.commit()
    return True