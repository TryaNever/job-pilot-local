import logging
import time

from pymysql import Timestamp

from core.redis import get_redis_client
from core.redis_tasks import RedisTasks


class Redis:
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("uvicorn")

    async def redis_error_checker(self):
        redis_client = get_redis_client()
        tasks = RedisTasks(redis_client)
        all_tasks = await tasks.get_all_tasks()
        sort_tasks = [task for task in all_tasks if time.time() - float(task["created_at"]) > 600 ]
        self.logger.info("=========")
        self.logger.info(sort_tasks)
        self.logger.info("=========")
        