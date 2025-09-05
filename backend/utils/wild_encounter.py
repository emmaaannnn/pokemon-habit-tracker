import random
from backend.services.pokemon_api import (
    get_non_legendary_pokemon_pool,
    get_legendary_pokemon_pool,
    get_mythical_pokemon_pool
)


def generate_random_pokemon(level_range: tuple = (1, 40)) -> dict:
    """
    Generates a random non-legendary Pokémon encounter using the API service.
    """
    pool = get_non_legendary_pokemon_pool(max_level=level_range[1])
    if not pool:
        return {}

    chosen = random.choice(pool)
    level = random.randint(level_range[0], level_range[1])

    return {
        "name": chosen["name"],
        "level": level
    }

def generate_legendary_encounter(level_range: tuple = (50, 70)) -> dict:
    """
    Generates a random legendary Pokémon encounter.
    """
    pool = get_legendary_pokemon_pool()
    if not pool:
        return {}

    chosen = random.choice(pool)
    level = random.randint(level_range[0], level_range[1])

    return {
        "name": chosen["name"],
        "level": level
    }

def generate_mythical_encounter(level_range: tuple = (40, 60)) -> dict:
    """
    Generates a random mythical Pokémon encounter.
    """
    pool = get_mythical_pokemon_pool()
    if not pool:
        return {}

    chosen = random.choice(pool)
    level = random.randint(level_range[0], level_range[1])

    return {
        "name": chosen["name"],
        "level": level
    }