from pydantic import BaseModel
from datetime import date
from typing import Optional


class Error(BaseModel):
    message: str


class CardioExerciseIn(BaseModel):
    name: str


class CardioExerciseOut(BaseModel):
    name: str
    id: str
    user_id: str


class CardioList(BaseModel):
    exercises: list[CardioExerciseOut]


class CardioWorkoutIn(BaseModel):
    workout_name: str
    exercise: str
    date: date
    type: str
    duration: str
    notes: Optional[str]


class CardioWorkoutOut(CardioWorkoutIn):
    id: str
    user_id: str


class CardioWorkoutList(BaseModel):
    workouts : list[CardioWorkoutOut]
