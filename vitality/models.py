from pydantic import BaseModel
from datetime import date
from typing import Optional, List


class Error(BaseModel):
    message: str


class CardioWorkoutIn(BaseModel):
    workout_name: str
    exercise: str
    date: date
    type: str
    duration: str
    notes: Optional[str]
    status: Optional[str] = "Incomplete"


class CardioWorkoutOut(CardioWorkoutIn):
    id: str
    user_id: str


class CardioWorkoutList(BaseModel):
    workouts: list[CardioWorkoutOut]


class StrengthExerciseOut(BaseModel):
    exercises: List


class StrengthExercise(BaseModel):
    name: str
    muscle: str
    notes: Optional[str]
    reps: str


class StrengthWorkoutIn(BaseModel):
    workout_name: str
    exercises: list[StrengthExercise]
    date: date
    type: str
    status: Optional[str] = "Incomplete"


class StrengthWorkoutOut(StrengthWorkoutIn):
    id: str
    user_id: str


class StrengthWorkoutReduce(BaseModel):
    id: str
    workout_name: str
    date: date
    type: str
    status: str


class StrengthWorkoutList(BaseModel):
    workouts: list[StrengthWorkoutReduce]


class Workouts(BaseModel):
    workout_name: str
    type: str
    date: date
    id: str
    user_id: str
    status: str


class WorkoutList(BaseModel):
    workouts: List
