from contextlib import asynccontextmanager
from fastapi import FastAPI
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from tasks.redis import Redis as RedisTasks
from core.database import Database
from api.post_pdf import router as pdf_router
from api.offers import router as offers_router
from web_socket.redis_worker_ia import router as redis_socket_router
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:

        redis_tasks = RedisTasks()
        scheduler = AsyncIOScheduler()
        scheduler.add_job(
            redis_tasks.redis_error_checker,
            "interval",
            seconds=10
        )
        scheduler.start()
        database_core = Database()
        database_core.create_db_and_tables()
        yield
        scheduler.shutdown()

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_router)
app.include_router(offers_router)
app.include_router(redis_socket_router)


@app.get("/")
def root():
    return {"message": "API OK"}