from asyncio import all_tasks
import logging
import time
from workers import post_offer
from models.offers import Offer
from core.database import EntityManager
from core.redis import get_redis_client
from core.redis_tasks import RedisTasks


class Redis:
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("uvicorn")
    
    def __init__(self):
        redis_client = get_redis_client()
        self.tasks = RedisTasks(redis_client)
        self.entitymanager = EntityManager()
        
    async def redis_error_checker(self):
        all_tasks = await self.tasks.get_all_tasks()
        sort_tasks = [task for task in all_tasks if time.time() - float(task["created_at"]) > 600 and task["step"] != "COMPLETED"]
        self.logger.info("=========")
        self.logger.info(sort_tasks)
        self.logger.info("=========")
        for task in sort_tasks:
            await self.tasks.update_task(
            task_id=task["task_id"],
            step="unknow",
            progress=task["progress"],
            status="failed",
        )

    async def redis_tasks_restart(self):
        running_tasks = await self.tasks.get_runnig_tasks()
        
        for task in running_tasks:
            offer = self.entitymanager.get_by_id(Offer,task['id_offer'])
            if offer:
                await post_offer.kiq(offer)
        
        