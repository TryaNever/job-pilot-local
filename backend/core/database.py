import os
from dotenv import load_dotenv
from sqlalchemy import inspect
from sqlalchemy.dialects.mysql import insert
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
    
    def post_get(self, model):
        self.session.add(model)
        self.session.commit()
        self.session.refresh(model)
        return model
        
    def get_by_id(self, model, id):
        return self.session.get(model, id)
        
        
    def continious_upsert(self, model):
        mapper = inspect(model.__class__)
        table = mapper.local_table

        values = {
            column.name: getattr(model, column.name)
            for column in mapper.columns
        }

        insert_data = insert(table).values(**values)

        update_values = {
            column.name: insert_data.inserted[column.name]
            for column in mapper.columns
            if not column.primary_key
        }

        final_insert_data = insert_data.on_duplicate_key_update(
            **update_values
        )

        self.session.exec(final_insert_data)
        self.session.commit()

    def close(self):
        self.session.close()
        
    def get_id(self, model):
        return model.id