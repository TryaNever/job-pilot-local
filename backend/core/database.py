from encodings import undefined
import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, Session, create_engine
from models import *


class Database:
    
    def __init__(self):
        load_dotenv()
        DATABASE_URL = os.getenv("DATABASE_URL")
        
        self.engine = create_engine(
            DATABASE_URL,
            echo=True
        )
        
    def create_db_and_tables(self):
        SQLModel.metadata.create_all(self.engine)
        
    def get_session(self):
        with Session(self.engine) as session:
            yield session
        

class EntityManager(Database):
    
    def __init__(self):
        super().__init__()
        self.session = Session(self.engine)
        
    def post(self,model): 
        self.session.add(model)
        self.session.commit()

        self.session.close()