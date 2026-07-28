from fastapi import APIRouter, Body
from pydantic import BaseModel
from datetime import datetime


router = APIRouter()

class OfferSchema(BaseModel):
    name: str | None = None
    company: int | None = None
    date_posted: datetime | None = None
    status: str | None = None
    html_brut: str
    html_clear: str | None = None
    ia_response: str | None = None
    last_updated: datetime | None = None
    created_date: datetime | None = None
    url_cv: str | None = None
    url_lettre: str | None = None
    url_offers: str | None = None

@router.post("/upload/offers")
async def new_offer(offer: OfferSchema):
    print(offer)
    print(offer.html_brut)
    print(offer.url_offers)

    return {"message": "OK"}