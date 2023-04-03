from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from auth import authenticator
from routers import accounts, cardio_exercises, cardio_workouts, strength_api, strength_workouts

app = FastAPI()

app.include_router(authenticator.router, tags=["Account"])
app.include_router(accounts.router, tags=["Account"])
app.include_router(cardio_exercises.router, tags=["Cardio Exercises"])
app.include_router(cardio_workouts.router, tags=["Cardio Workouts"])
app.include_router(strength_api.router, tags=["Strength Exercises"])
app.include_router(strength_workouts.router, tags=["Strength Workouts"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
