import json
from fastapi import APIRouter
from pydantic import BaseModel
from datetime import date, datetime
from services.soup import SoupCleaner
from services.ia.ia_service import Ia_service
from models.offers import StatusOffert

cleaner = SoupCleaner()

ia_agent = Ia_service()

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
    ia_agent_response = ia_agent.fetch_ia(offer.html_clear)
    data = json.loads(ia_agent_response)
    offer.ia_response = data
    offer.name = data["job"]["title"]
    offer.date_posted = data["publication_date"]
    offer.status = StatusOffert.TO_APPLY
    offer.last_updated = date()
    offer.created_date = date()
    return {"message": str(ia_agent_response)}

