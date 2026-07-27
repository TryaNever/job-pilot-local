import enum
from datetime import datetime
from sqlalchemy import TIMESTAMP, Column, Enum, Text,ForeignKey
from sqlmodel import Field, SQLModel
from models.company import Company


class StatusOffert(enum.Enum):
    TO_APPLY = "to_apply"
    APPLIED = "applied"
    INTERVIEW = "interview"
    REJECTED = "rejected"
    ACCEPTED = "accepted"
    
class Offer(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    company: int = Field(foreign_key="company.id")
    date_posted: datetime | None = Field(default=None, sa_column=Column(TIMESTAMP(timezone=True)))
    status: str | None = Field(default=None, sa_column=Column(Enum(StatusOffert, native_enum=False)))
    html_brut: str = Field(sa_column=Column(Text))
    html_clear: str = Field(sa_column=Column(Text))
    ia_response: str = Field(sa_column=Column(Text))
    last_updated: datetime | None = Field(default=None, sa_column=Column(TIMESTAMP(timezone=True)))
    created_date: datetime | None = Field(default=None, sa_column=Column(TIMESTAMP(timezone=True)))
    url_cv: str = Field(sa_column=Column(Text))
    url_lettre: str = Field(sa_column=Column(Text))