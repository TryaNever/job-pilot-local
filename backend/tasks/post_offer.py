import datetime
import json

from taskiq import Context
from core.database import EntityManager
from models.offers import Offer, StatusOffert

from fastapi import APIRouter
from services.ia.ia_service import IaService
from services.soup import SoupCleaner
from core.broker import broker
from core.redis import get_redis_client
from core.redis_tasks import RedisTasks


cleaner = SoupCleaner()
ia_agent = IaService()
router = APIRouter()

@broker.task
async def post_offer(offer: Offer, ctx: Context):

    task_id = ctx.message.task_id

    redis_client = get_redis_client()
    tasks = RedisTasks(redis_client)
    
    print(await tasks.get_all_tasks())

    await tasks.update_task(
        task_id,
        "CLEAN_HTML",
        10
    )

    clean_html = cleaner.clean(
        offer.html_brut
    )

    offer.html_clear = cleaner.to_text(clean_html)

    await tasks.update_task(
        task_id,
        "IA_ANALYSIS (étape longue)",
        50
    )

    ia_agent_response = ia_agent.fetch_ia(
        offer.html_clear
    )

    offer.ia_response = ia_agent_response

    data = json.loads(ia_agent_response)

    offer.name = data["job"]["title"]
    offer.company = None  # data["job"]["company"]
    offer.date_posted = data["job"]["publication_date"]

    await tasks.update_task(
        task_id,
        "SAVE_DATABASE",
        90
    )

    offer.status = StatusOffert.TO_APPLY
    offer.last_updated = datetime.datetime.now()
    offer.created_date = datetime.datetime.now()

    entitymanager = EntityManager()
    entitymanager.post(offer)

    await tasks.update_task(
        task_id,
        "DONE",
        100,
        status="completed"
    )

    return {
        "status": "done",
        "data": data
    }