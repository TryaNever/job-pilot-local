from contextlib import asynccontextmanager
from fastapi import FastAPI

from core.database import database
from api.post_pdf import router as pdf_router
from api.offers import router as offers_router
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    database_core = database()
    database_core.create_db_and_tables()
    yield


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


@app.get("/")
def root():
    return {"message": "API OK"}