from sqlmodel import Field, SQLModel
from sqlalchemy import Column, TIMESTAMP, Enum, Text
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
import enum

class StatusOffert(enum.Enum):
    TO_APPLY = "to_apply"
    APPLIED = "applied"
    INTERVIEW = "interview"
    REJECTED = "rejected"
    ACCEPTED = "accepted"

class Offer(SQLModel, table= True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    entreprise: str = Field(index=True)
    date_posted: datetime = Field(sa_column=Column(TIMESTAMP(timezone=True)))
    status: Column(Enum(StatusOffert))
    html_brut: Mapped[str] = mapped_column(Text)
    html_clear: Mapped[str] = mapped_column(Text)
    ia_response: Mapped[str] = mapped_column(Text)
    last_updated: datetime = Field(sa_column=Column(TIMESTAMP(timezone=True)))
    created_date: datetime = Field(sa_column=Column(TIMESTAMP(timezone=True)))