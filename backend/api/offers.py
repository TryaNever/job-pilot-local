
from fastapi import APIRouter
import redis
from backend.tasks.ia_call import ia_call
from models.offers import Offer
from services.soup import SoupCleaner
from services.ia.ia_service import Ia_service

cleaner = SoupCleaner()

ia_agent = Ia_service()

router = APIRouter()


@router.post("/upload/offers")
async def new_offer(offer: Offer):
    task_result = await ia_call.kiq(offer)
    
    task_id = task_result.task_id
    
    await redis.hset(
    f"task:{task_id}",
    mapping={
        "status": "queued",
        "progress": 0,
    })
    return {"message": "tasks end"}