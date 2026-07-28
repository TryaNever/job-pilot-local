from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from services.soup import SoupCleaner

cleaner = SoupCleaner()

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
    clean_html = cleaner.clean(offer.html_brut)

    clean_text = cleaner.to_text(clean_html)
    return {"message": clean_text}

