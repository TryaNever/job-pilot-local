import datetime

from fastapi import APIRouter, HTTPException
from core.database import EntityManager
from core.redis import get_redis_client
from workers.post_offer import post_offer
from models.offers import Offer, StatusOffert


router = APIRouter()


@router.post("/upload/offers")
async def new_offer(offer: Offer):
    if offer.html_brut is None:
        raise HTTPException(
            status_code=400,
            detail="html_brut must be provided and cannot be null",
        )

    redis = get_redis_client()
    
    entitymanager = EntityManager()
    
    if offer.status is None:
        offer.status = StatusOffert.TO_APPLY
        offer.created_at = datetime.datetime.now()
        entitymanager.continious_upsert(offer)
    task_result = await post_offer.kiq(offer)
    
    id_offer = entitymanager.get_id(offer)
    
    entitymanager.close()
    task_id = task_result.task_id
    
    await redis.hset(
    f"task:{task_id}",
    mapping={
        "status": "QUEUED",
        "step": "ADDED_QUEUE",
        "progress": 0,
        "created_at": datetime.datetime.now().timestamp(),
        "html_brut": offer.html_brut,
        "id_offer": id_offer
    })
    return {"message": "tasks send to redis todo set webhook to get advence info"}