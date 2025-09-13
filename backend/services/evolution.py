from sqlalchemy.orm import Session
from backend.models import Pokemon
from backend.services.pokemon_api import get_evolution_data

def check_and_trigger_evolution(db: Session, pokemon: Pokemon):
    """
    Checks if the Pokémon meets evolution conditions and evolves it if eligible.
    """
    evolution_info = get_evolution_data(pokemon.name)

    if not evolution_info:
        return

    # Level-based evolution
    if evolution_info.get("trigger") == "level-up":
        required_level = evolution_info.get("min_level")
        if required_level and pokemon.level >= required_level:
            evolve_pokemon(pokemon, evolution_info["next_species"])
            db.commit()

def evolve_pokemon(pokemon: Pokemon, new_species: str):
    """
    Updates the Pokémon's species to its evolved form.
    """
    pokemon.name = new_species
    pokemon.has_evolved = True