import datetime
import re

def text_to_datetime(text):
    """Converts text like "2 months ago" to a datetime object."""

    # Regular expression to extract number and time unit
    match = re.match(r"(\d+) (\w+) ago", text)
    if match:
        quantity, unit = match.groups()
        quantity = int(quantity)

        # Calculate the time delta based on the unit
        delta = {
            "days": datetime.timedelta(days=quantity),
            "day": datetime.timedelta(days=quantity),
            "weeks": datetime.timedelta(weeks=quantity),
            "week": datetime.timedelta(weeks=quantity),
            "months": datetime.timedelta(days=30 * quantity),
            "month": datetime.timedelta(days=30 * quantity),
            "years": datetime.timedelta(days=365 * quantity),
            "year": datetime.timedelta(days=365 * quantity),
        }.get(unit.lower())

        if delta:
            # Subtract the delta from the current datetime
            now = datetime.datetime.now()
            return (now - delta).strftime("%m/%d/%Y, %H:%M:%S")

    # Return None if the text doesn't match the expected format
    return None
