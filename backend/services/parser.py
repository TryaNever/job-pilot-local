from datetime import datetime
import re

class Parser:
    @staticmethod
    def parse_date_posted(value: str | None):
        if not value:
            return None

        value = re.sub(r"\s*-\s*\d+\s*days?\s*$", "", value)

        try:
            return datetime.fromisoformat(value)
        except ValueError:
            return None