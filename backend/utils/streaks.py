from datetime import datetime, timedelta
from backend.models import Habit

def is_streak_continued(habit: Habit, now: datetime = None) -> bool:
    """
    Determines if the streak should continue based on last_completed and frequency.
    If frequency_per_week < 7, missing a day doesn't break the streak.
    """
    now = now or datetime.utcnow()
    if not habit.last_completed:
        return False

    days_since_last = (now.date() - habit.last_completed.date()).days

    if habit.frequency_per_week < 7:
        # Allow gaps in daily completion
        return True
    else:
        # Daily habit must be completed yesterday or today
        return days_since_last <= 1

def should_reset_streak(habit: Habit, now: datetime = None) -> bool:
    """
    Determines if the streak should reset.
    Only resets if frequency is daily and habit was missed.
    """
    now = now or datetime.utcnow()
    if not habit.last_completed:
        return False

    days_since_last = (now.date() - habit.last_completed.date()).days

    return habit.frequency_per_week == 7 and days_since_last > 1

def calculate_streak_bonus(habit: Habit) -> float:
    """
    Calculates bonus XP based on streak count.
    +0.5 per daily streak
    +1.0 per full week of streaks
    """
    daily_bonus = habit.streak_count * 0.5
    weekly_bonus = (habit.streak_count // 7) * 1.0
    return round(daily_bonus + weekly_bonus, 2)