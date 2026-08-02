
from fastapi import APIRouter, WebSocket


router = APIRouter()


@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    await websocket.send_text(f"Hello, Client {client_id}")
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message from {client_id}: {data}")