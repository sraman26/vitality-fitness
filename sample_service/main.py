from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from auth import authenticator
from routers import accounts, cardio
import muscle

app = FastAPI()

app.include_router(authenticator.router, tags=["Account"])
app.include_router(accounts.router, tags=["Account"])
app.include_router(cardio.router, tags=["Cardio"])
app.include_router(muscle.router, tags=["TEST"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
