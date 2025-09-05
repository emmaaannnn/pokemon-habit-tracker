from backend.services.pokemon_api import get_evolution_data

def get_evolution_data(pokemon_name: str) -> dict | None:
    """
    Fetches evolution data for a given Pokémon from a public Pokémon API.
    Returns None if no evolution data is found.
    """
    # This function would typically make an API call to fetch evolution data.
    # For example purposes, let's assume it returns a dictionary or None.
    # Example structure: {"trigger": "level-up", "min_level": 16, "item": None}
    api_response = fetch_evolution_data_from_api(pokemon_name)
    return api_response

def get_evolution_threshold(pokemon_name: str) -> int | None:
    """
    Returns the level required for evolution using public Pokémon API.
    Returns None if evolution is item-based or not level-based.
    """
    evolution_info = get_evolution_data(pokemon_name)

    if not evolution_info:
        return None

    # Example structure: {"trigger": "level-up", "min_level": 16, "item": None}
    if evolution_info.get("trigger") == "level-up":
        return evolution_info.get("min_level", None)

    # If evolution requires item or other condition
    return None

def calculate_catch_rate(pokemon_level: int, ball_type: str = "pokeball") -> float:
    """
    Calculates catch rate based on Pokémon level and ball type.
    """
    base_rate = max(10, 100 - pokemon_level * 2)
    ball_modifier = {
        "pokeball": 1.0,
        "greatball": 1.5,
        "ultraball": 2.0
    }.get(ball_type.lower(), 1.0)
    return round(base_rate * ball_modifier, 2)

def format_pokemon_name(name: str) -> str:
    """
    Formats Pokémon name for display (e.g. capitalized).
    """
    return name.strip().capitalize()