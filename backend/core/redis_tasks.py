import json


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
                "progress": progress,
            }
        )

        await self.redis.publish(
            "tasks",
            json.dumps({
            "task_id": task_id,
            "status": status,
            "step": step,
            "progress": progress,
            })
        )
    
    async def get_all_tasks(self):
        tasks = []

        async for key in self.redis.scan_iter("task:*"):
            task = await self.redis.hgetall(key)
            task["task_id"] = key.split(":")[1]
            tasks.append(task)

        tasks.sort(key=lambda t: float(t["created_at"]))
        return tasks