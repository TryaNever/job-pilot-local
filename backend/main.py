from contextlib import asynccontextmanager
from fastapi import FastAPI

from core.database import create_db_and_tables
from api.postPdf import router as pdf_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(pdf_router)


@app.get("/")
def root():
    return {"message": "API OK"}