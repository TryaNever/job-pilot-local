from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from services.soup import SoupCleaner
from services.ia_generate import Ia_generate

cleaner = SoupCleaner()

ia_agent = Ia_generate()

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
    offer.html_clear = cleaner.to_text(clean_html)
    print(offer.html_clear)
    ia_agent_response = ia_agent.fetch_ia(offer.html_clear)
    return {"message": str(ia_agent_response)}

