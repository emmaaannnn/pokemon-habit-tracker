import requests
from functools import lru_cache

POKEAPI_BASE = "https://pokeapi.co/api/v2"

@lru_cache(maxsize=1)
def fetch_all_pokemon_species(limit: int = 1000) -> list[dict]:
    """
    Fetches all Pokémon species from PokéAPI.
    Caches the result to avoid repeated calls.
    """
    url = f"{POKEAPI_BASE}/pokemon-species?limit={limit}"
    response = requests.get(url)
    data = response.json()

    species_list = []
    for entry in data["results"]:
        species_data = requests.get(entry["url"]).json()
        species_list.append({
            "name": species_data["name"],
            "is_legendary": species_data["is_legendary"],
            "is_mythical": species_data["is_mythical"],
            "evolution_chain_url": species_data["evolution_chain"]["url"]
        })

    return species_list

def get_non_legendary_pokemon_pool(max_level: int = 40) -> list[dict]:
    """
    Returns non-legendary, non-mythical Pokémon.
    Level filtering is symbolic unless you add base level metadata.
    """
    all_pokemon = fetch_all_pokemon_species()
    return [p for p in all_pokemon if not p["is_legendary"] and not p["is_mythical"]]

def get_legendary_pokemon_pool() -> list[dict]:
    return [p for p in fetch_all_pokemon_species() if p["is_legendary"]]

def get_mythical_pokemon_pool() -> list[dict]:
    return [p for p in fetch_all_pokemon_species() if p["is_mythical"]]

def get_evolution_data(pokemon_name: str) -> dict | None:
    """
    Fetches evolution data for a given Pokémon.
    Returns trigger, level, item, and next species.
    """
    species_list = fetch_all_pokemon_species()
    species = next((s for s in species_list if s["name"] == pokemon_name.lower()), None)
    if not species:
        return None

    evo_chain_url = species["evolution_chain_url"]
    evo_chain_data = requests.get(evo_chain_url).json()

    def find_evolution(chain):
        if chain["species"]["name"] == pokemon_name.lower():
            if chain["evolves_to"]:
                evo = chain["evolves_to"][0]
                details = evo["evolution_details"][0]
                return {
                    "trigger": details["trigger"]["name"],
                    "min_level": details.get("min_level"),
                    "item": details.get("item", {}).get("name"),
                    "next_species": evo["species"]["name"]
                }
        for sub in chain["evolves_to"]:
            result = find_evolution(sub)
            if result:
                return result
        return None

    return find_evolution(evo_chain_data["chain"])