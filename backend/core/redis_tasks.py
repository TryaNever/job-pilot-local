class RedisTasks:

    def __init__(self, redis):
        self.redis = redis

    async def update_task(
        self,
        task_id,
        step,
        progress,
        status="processing"
    ):
        await self.redis.hset(
            f"task:{task_id}",
            mapping={
                "status": status,
                "step": step,
                "progress": progress
            }
        )

        await self.redis.publish(
            "tasks",
            {
            "task_id": task_id,
            "status": status,
            "step": step,
            "progress": progress
            }
        )