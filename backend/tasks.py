import datetime
import json
from core.database import entity_manager
from models.offers import Offer, StatusOffert

from fastapi import APIRouter
from services.ia.ia_service import Ia_service
from services.soup import SoupCleaner
from broker import broker



cleaner = SoupCleaner()

ia_agent = Ia_service()

router = APIRouter()


@broker.task
async def ia_call(offer: Offer):
    clean_html = cleaner.clean(offer.html_brut)
    offer.html_clear = cleaner.to_text(clean_html)
    ia_agent_response = ia_agent.fetch_ia(offer.html_clear)
    offer.ia_response = ia_agent_response
    data = json.loads(ia_agent_response)
    offer.name = data["job"]["title"]
    offer.company = None #data["job"]["company"]
    offer.date_posted = data["job"]["publication_date"]
    offer.status = StatusOffert.TO_APPLY
    offer.last_updated = datetime.datetime.now()
    offer.created_date = datetime.datetime.now()
    entitymanager = entity_manager()
    entitymanager.post(offer)
    return {
        "status": "done",
        "data": data,
    }