def apply_xp_boost(base_xp: int, item_effect: str) -> int:
    """
    Applies XP boost based on item effect type.
    """
    multiplier = {
        "xp_boost": 2.0,
        "xp_candy": 1.5
    }.get(item_effect, 1.0)
    return int(base_xp * multiplier)

def get_item_effect(item_name: str) -> dict:
    """
    Returns effect metadata for a given item.
    """
    effects = {
        "xp_candy": {"type": "xp_boost", "multiplier": 1.5},
        "xp_booster": {"type": "xp_boost", "multiplier": 2.0},
        "pokeball": {"type": "catch_rate", "modifier": 1.0},
        "greatball": {"type": "catch_rate", "modifier": 1.5}
    }
    return effects.get(item_name.lower(), {})

def apply_item_effect(item: Item, base_value: int) -> int:
    """
    Applies the item's effect to a base value (e.g. XP).
    """
    if item.effect_type == "xp_boost":
        multiplier = getattr(item, "effect_value", 1.5)
        return int(base_value * multiplier)
    elif item.effect_type == "catch_rate":
        modifier = getattr(item, "effect_value", 1.0)
        return int(base_value * modifier)
    else:
        return base_value