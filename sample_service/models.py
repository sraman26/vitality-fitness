from pydantic import BaseModel
from datetime import date
from typing import Optional
from typing import List


class CardioExerciseIn(BaseModel):
    name: str


class CardioExerciseOut(BaseModel):
    name: str
    id: str


class CardioList(BaseModel):
    exercises: list[CardioExerciseOut]


class CardioWorkoutIn(CardioExerciseOut):
    date: date
    type: str
    duration: str
    notes: Optional[str]


class CardioWorkoutOut(CardioWorkoutIn):
    id: str
