def fetch_all_pokemon_data() -> list[dict]:
    """
    Fetches all Pokémon data from a public Pokémon API.
    This is a placeholder function and should be implemented to make actual API calls.
    """
    # Example static data for illustration purposes
    return [
    ]

def get_non_legendary_pokemon_pool(max_level: int = 40) -> list[dict]:
    """
    Returns a list of Pokémon species that are not legendary or mythical,
    and whose base level is <= max_level.
    """
    all_pokemon = fetch_all_pokemon_data()
    return [
        p for p in all_pokemon
        if not p["is_legendary"] and not p["is_mythical"] and p["base_level"] <= max_level
    ]

def get_legendary_pokemon_pool() -> list[dict]:
    """
    Returns a list of legendary Pokémon species.
    """
    all_pokemon = fetch_all_pokemon_data()
    return [p for p in all_pokemon if p.get("is_legendary")]

def get_mythical_pokemon_pool() -> list[dict]:
    """
    Returns a list of mythical Pokémon species.
    """
    all_pokemon = fetch_all_pokemon_data()
    return [p for p in all_pokemon if p.get("is_mythical")]