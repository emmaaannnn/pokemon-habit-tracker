from datetime import datetime
from backend.models import Habit
from backend.utils.streaks import (
    is_streak_continued,
    should_reset_streak,
    calculate_streak_bonus
)

def update_streak(habit: Habit, now: datetime = None) -> int:
    """
    Updates the habit's streak count based on last completion.
    Returns the updated streak count.
    """
    now = now or datetime.utcnow()

    if should_reset_streak(habit, now):
        habit.streak_count = 1
    elif is_streak_continued(habit, now):
        habit.streak_count += 1
    else:
        habit.streak_count = 1

    habit.last_completed = now
    return habit.streak_count

def get_streak_bonus(habit: Habit) -> int:
    """
    Returns the XP bonus based on current streak.
    """
    return calculate_streak_bonus(habit)