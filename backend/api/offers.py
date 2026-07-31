
from fastapi import APIRouter
from tasks import ia_call
from models.offers import Offer
from services.soup import SoupCleaner
from services.ia.ia_service import Ia_service

cleaner = SoupCleaner()

ia_agent = Ia_service()

router = APIRouter()


@router.post("/upload/offers")
async def new_offer(offer: Offer):
    task_result = await ia_call(offer)
    return {"message": "tasks end"}