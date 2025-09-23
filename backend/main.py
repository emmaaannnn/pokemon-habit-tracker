from fastapi import FastAPI

from database import Base, engine
from models import user, pokemon, habit, inventory, habit_pokemon_link, item, party  # import all models

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}