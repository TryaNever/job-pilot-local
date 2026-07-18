from contextlib import asynccontextmanager

from fastapi import FastAPI

from core.database import create_db_and_tables
import models  # charge tous les modèles


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Avant que l'application accepte les requêtes
    create_db_and_tables()

    yield

    # Nettoyage à l'arrêt si besoin
    pass


app = FastAPI(lifespan=lifespan)


@app.get("/")
def root():
    return {"message": "API OK"}