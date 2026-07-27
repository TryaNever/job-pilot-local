import enum
from datetime import datetime

from sqlalchemy import TIMESTAMP, Column, Enum, Text
from sqlmodel import Field, SQLModel


class StatusOffert(enum.Enum):
    TO_APPLY = "to_apply"
    APPLIED = "applied"
    INTERVIEW = "interview"
    REJECTED = "rejected"
    ACCEPTED = "accepted"
    
class Offer(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    entreprise: str = Field(index=True)
    date_posted: datetime | None = Field(default=None, sa_column=Column(TIMESTAMP(timezone=True)))
    status: str | None = Field(default=None, sa_column=Column(Enum(StatusOffert, native_enum=False)))
    html_brut: str = Field(sa_column=Column(Text))
    html_clear: str = Field(sa_column=Column(Text))
    ia_response: str = Field(sa_column=Column(Text))
    last_updated: datetime | None = Field(default=None, sa_column=Column(TIMESTAMP(timezone=True)))
    created_date: datetime | None = Field(default=None, sa_column=Column(TIMESTAMP(timezone=True)))