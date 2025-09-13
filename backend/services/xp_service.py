from sqlalchemy.orm import Session
from backend.models import Pokemon
from backend.utils.xp import should_level_up, get_required_xp
from backend.services.evolution import check_and_trigger_evolution

def apply_xp_to_pokemon(db: Session, pokemon: Pokemon, xp_gain: int):
    """
    Applies XP to a Pokémon and handles level-up and evolution.
    """
    pokemon.xp += xp_gain

    # Level up loop (in case multiple levels gained)
    while should_level_up(pokemon.xp, pokemon.level):
        pokemon.xp -= get_required_xp(pokemon.level)
        pokemon.level += 1

        # Check for evolution
        check_and_trigger_evolution(db, pokemon)

    db.commit()