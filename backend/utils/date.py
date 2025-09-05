from datetime import datetime, timedelta

def is_same_day(date1: datetime, date2: datetime) -> bool:
    return date1.date() == date2.date()

def days_between(date1: datetime, date2: datetime) -> int:
    return abs((date2.date() - date1.date()).days)

def is_within_days(date: datetime, days: int, now: datetime = None) -> bool:
    now = now or datetime.utcnow()
    return (now.date() - date.date()) <= timedelta(days=days)

def format_date_for_display(date: datetime) -> str:
    return date.strftime("%Y-%m-%d")