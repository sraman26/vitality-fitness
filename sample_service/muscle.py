from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from pydantic import BaseModel
from typing import List
import requests
# from env import API_KEY

class MuscleOut(BaseModel):
    workouts: List

class MuscleQueries:
    base_url = 'https://api.api-ninjas.com/v1/exercises?'
    def get_exercise_by_muscle(self, muscle:str):
        headers={'X-Api-Key': 'miZDGjvtBYyv9qSV1dIncw==jjYja7ggStstXS06'}
        res = requests.get(self.base_url+f'type=strength&muscle={muscle}', headers=headers)
        return res.json()


router = APIRouter()
@router.get('/{muscle}', response_model=MuscleOut)
def get_muscle(muscle: str, queries:MuscleQueries=Depends()):
    return {"workouts": queries.get_exercise_by_muscle(muscle)}
