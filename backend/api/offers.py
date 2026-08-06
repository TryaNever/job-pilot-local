
import datetime

from fastapi import APIRouter
from core.redis import get_redis_client
from workers.post_offer import post_offer
from models.offers import Offer


router = APIRouter()


@router.post("/upload/offers")
async def new_offer(offer: Offer):
    redis = get_redis_client()
    task_result = await post_offer.kiq(offer)
    
    task_id = task_result.task_id
    
    await redis.hset(
    f"task:{task_id}",
    mapping={
        "status": "QUEUED",
        "progress": 0,
        "created_at": datetime.datetime.now().timestamp(),
        "html_brut": offer.html_brut
    })
    return {"message": "tasks send to redis todo set webhook to get advence info"}