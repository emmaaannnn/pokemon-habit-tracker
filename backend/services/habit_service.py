from datetime import datetime
from sqlalchemy.orm import Session
from backend.models import Habit, HabitLog, Pokemon
from backend.utils.streaks import (
    is_streak_continued,
    should_reset_streak,
    calculate_streak_bonus
)
from backend.utils.xp import calculate_xp_gain, should_level_up
from backend.services.xp_service import apply_xp_to_pokemon
from backend.services.reward import reward_level_100

def complete_habit(db: Session, habit: Habit, pokemon: Pokemon, base_xp: int = 10):
    """
    Marks a habit as completed, updates streak, logs it, and applies XP to Pokémon.
    """
    now = datetime.utcnow()

    # Update streak
    if should_reset_streak(habit, now):
        habit.streak_count = 1
    elif is_streak_continued(habit, now):
        habit.streak_count += 1
    else:
        habit.streak_count = 1

    habit.last_completed = now

    # Calculate streak bonus
    streak_bonus = calculate_streak_bonus(habit)

    # Apply XP
    total_xp = calculate_xp_gain(base=base_xp, streak_bonus=streak_bonus)
    apply_xp_to_pokemon(db, pokemon, total_xp)

    # Log habit
    log = HabitLog(habit_id=habit.id, completed_at=now)
    db.add(log)
    db.commit()

    # Reward if Pokémon hits level 100
    if pokemon.level == 100 and not pokemon.has_received_level_100_reward:
        reward_level_100(db, habit.user_id)
        pokemon.has_received_level_100_reward = True
        db.commit()

    return {
        "message": f"Habit '{habit.name}' completed!",
        "xp_gained": total_xp,
        "streak_count": habit.streak_count,
        "pokemon_level": pokemon.level
    }