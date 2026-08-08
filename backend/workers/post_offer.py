import datetime
import json
from typing import Annotated

from taskiq import TaskiqDepends
from taskiq.context import Context
from services.parser import Parser
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
async def post_offer(offer: Offer , ctx: Annotated[Context, TaskiqDepends()], task_id: None | str = None):
    if task_id is None:
        task_id = ctx.message.task_id
        
    entitymanager = EntityManager()
    
    redis_client = get_redis_client()
    tasks = RedisTasks(redis_client)
    
    if offer.html_clear is None:

        await tasks.update_task(
            task_id,
            "CLEAN_HTML",
            10,
            status="RUNNING"
        )

        clean_html = cleaner.clean(
            offer.html_brut
        )

        offer.html_clear = cleaner.to_text(clean_html)
        offer.id_redis = task_id

        entitymanager.continious_upsert(offer)

    if offer.ia_response is None:
        await tasks.update_task(
            task_id,
            "IA_ANALYSIS (étape longue)",
            50,
            status="RUNNING"
        )

        ia_agent_response = ia_agent.fetch_ia(
            offer.html_clear
        )
        try:
            data = json.loads(ia_agent_response)
        except json.JSONDecodeError as e:
            print(e)
            print(ia_agent_response)
            raise
        
        offer.ia_response = str(ia_agent_response)
        offer.name = data["job"]["title"]
        offer.company = None  # data["job"]["company"]
        
        parser = Parser()
        offer.date_posted = parser.parse_date_posted(data["job"]["publication_date"])
        
        entitymanager.continious_upsert(offer)
    if offer.created_date is None:
        await tasks.update_task(
            task_id,
            "SAVE_DATABASE",
            90,
            status="RUNNING"
        )

        offer.last_updated = datetime.datetime.now()
        offer.created_date = datetime.datetime.now()

        try:
            entitymanager.post(offer)
        except:
            await tasks.update_task(
                task_id,
                "ERROR_WRONG_DATA",
                100,
                status="FAILED"
                )
            return

        await tasks.update_task(
            task_id,
            "DONE",
            100,
            status="COMPLETED",
        )

    return {
        "status": "DONE",
        "data": data
    }