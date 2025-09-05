def is_party_full(party: list, max_size: int = 6) -> bool:
    """
    Checks if the party has reached its maximum size.
    """
    return len(party) >= max_size

def can_add_to_party(pokemon: dict, party: list) -> bool:
    """
    Determines if a Pokémon can be added to the party.
    """
    return not pokemon.get("is_in_party") and not is_party_full(party)

def switch_pokemon(party: list, box: list, pokemon_id: int) -> tuple[list, list]:
    """
    Switches a Pokémon between party and box.
    """
    for p in party:
        if p["id"] == pokemon_id:
            party.remove(p)
            box.append(p)
            p["is_in_party"] = False
            return party, box

    for b in box:
        if b["id"] == pokemon_id and not is_party_full(party):
            box.remove(b)
            party.append(b)
            b["is_in_party"] = True
            return party, box

    return party, box