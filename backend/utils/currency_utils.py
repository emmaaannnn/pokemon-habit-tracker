def calculate_coin_reward(streak_count: int, frequency: int) -> int:
    """
    Calculates coin reward based on streak and habit frequency.
    """
    base = 10
    bonus = streak_count * 2
    multiplier = 1.0 if frequency < 7 else 1.5
    return int((base + bonus) * multiplier)

def can_afford(user_currency: int, item_cost: int) -> bool:
    """
    Checks if the user has enough currency to purchase an item.
    """
    return user_currency >= item_cost