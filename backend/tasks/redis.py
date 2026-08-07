import logging
import time

from pymysql import Timestamp

from core.redis import get_redis_client
from core.redis_tasks import RedisTasks


class Redis:
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("uvicorn")
    
    def __init__(self):
        redis_client = get_redis_client()
        self.tasks = RedisTasks(redis_client)
        
    async def redis_error_checker(self):
        all_tasks = await self.tasks.get_all_tasks()
        sort_tasks = [task for task in all_tasks if time.time() - float(task["created_at"]) > 600 and task["step"] != "DONE"]
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
