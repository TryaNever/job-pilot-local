from core.redis import get_redis_client
from core.redis_tasks import RedisTasks


class Redis:
    async def redis_error_checker():
        redis_client = get_redis_client()
        tasks = RedisTasks(redis_client)
        all_tasks = await tasks.get_all_tasks()
        
        print(all_tasks)