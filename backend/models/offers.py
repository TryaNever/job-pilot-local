import enum
from datetime import datetime
from sqlalchemy import INTEGER, TIMESTAMP, Column, Enum, Text
from sqlmodel import Field, SQLModel
from sqlalchemy.dialects.mysql import LONGTEXT
from models.company import Company


class StatusOffert(enum.Enum):
    TO_APPLY = "to_apply"
    APPLIED = "applied"
    INTERVIEW = "interview"
    REJECTED = "rejected"
    ACCEPTED = "accepted"
    
class Offer(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    id_redis: int | None = Field(sa_column=Column(INTEGER))
    name: str = Field(index=True)
    company: int | None = Field(foreign_key="company.id")
    date_posted: datetime | None = Field(default=None, sa_column=Column(TIMESTAMP(timezone=True)))
    status: str | None = Field(default=None, sa_column=Column(Enum(StatusOffert, native_enum=False)))
    html_brut: str | None = Field(sa_column=Column(LONGTEXT))
    html_clear: str | None = Field(sa_column=Column(LONGTEXT))
    ia_response: str | None = Field(sa_column=Column(LONGTEXT))
    last_updated: datetime | None = Field(default=None, sa_column=Column(TIMESTAMP(timezone=True)))
    created_date: datetime | None = Field(default=None, sa_column=Column(TIMESTAMP(timezone=True)))
    url_cv: str | None = Field(sa_column=Column(Text))
    url_lettre: str | None = Field(sa_column=Column(Text))
    url_offers: str | None = Field(sa_column=Column(Text))