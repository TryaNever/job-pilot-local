
from fastapi import APIRouter, WebSocket

from core.redis import get_redis_client
from core.redis_tasks import RedisTasks


router = APIRouter()


@router.websocket("/ws/worker")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
 
    redis_client = get_redis_client()
    tasks = RedisTasks(redis_client)
    
    data_json = await tasks.get_all_tasks()
    await websocket.send_json(data_json)
