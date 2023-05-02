from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from auth import authenticator
from routers import accounts, strength_api, workouts, youtube_api

app = FastAPI()

app.include_router(authenticator.router, tags=["Account"])
app.include_router(accounts.router, tags=["Account"])
app.include_router(strength_api.router, tags=["Strength"])
app.include_router(workouts.router)
app.include_router(youtube_api.router, tags=["Video"])

origins = [
    "http://localhost:3000",
    "https://tbb257.gitlab.io/module3-project-gamma",
    "https://tbb257.gitlab.io",
    os.environ.get("CORS_HOST", None),
    os.environ.get("REACT_APP_VITALITY_API_HOST", None),
    os.environ.get("PUBLIC_URL", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
