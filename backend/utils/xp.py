def calculate_xp_gain(base: int, streak_bonus: int = 0, multiplier: float = 1.0) -> int:
    """
    Calculates XP gain based on base value, streak bonus, and optional multiplier.
    """
    xp = (base + streak_bonus) * multiplier
    return int(xp)

def get_required_xp(level: int) -> int:
    """
    Returns the XP required to reach the next level.
    Uses a quadratic scaling formula.
    """
    return 50 + (level ** 2) * 10

def should_level_up(current_xp: int, current_level: int) -> bool:
    """
    Determines if a Pokémon should level up based on current XP and level.
    """
    return current_xp >= get_required_xp(current_level)