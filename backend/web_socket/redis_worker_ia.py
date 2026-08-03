
import asyncio

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from core.redis import get_redis_client
from core.redis_tasks import RedisTasks


router = APIRouter()


@router.websocket("/ws/worker")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    redis_client = get_redis_client()
    tasks = RedisTasks(redis_client)

    await websocket.send_json(await tasks.get_all_tasks())

    pubsub = redis_client.pubsub()
    await pubsub.subscribe("tasks")

    try:
        while True:
            message = await pubsub.get_message(
                ignore_subscribe_messages=True,
                timeout=1,
            )

            if message and message["type"] == "message":
                await websocket.send_json(await tasks.get_all_tasks())

    except WebSocketDisconnect:
        pass

    finally:
        await pubsub.unsubscribe("tasks")
        await pubsub.close()
