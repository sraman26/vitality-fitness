from pydantic import BaseModel
from typing import List

class MuscleOut(BaseModel):
    workouts: List
    # name: str
    # type: str
    # muscle: str
    # equipment: str
    # difficulty: str