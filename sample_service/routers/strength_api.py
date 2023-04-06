from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import List, Union
from models import StrengthExerciseOut
# from queries.strength_api import StrengthQueries
from auth import authenticator
import os
import requests

router = APIRouter()

api_key = os.environ["API_KEY"]

def get_exercise_by_muscle(muscle:str, base_url) -> StrengthExerciseOut:
        headers={'X-Api-Key': api_key}
        res = requests.get(base_url+f'type=strength&muscle={muscle}', headers=headers)
        return res.json()

@router.get('/api/exercise/strength/{muscle}/', response_model=StrengthExerciseOut)
def get_muscle(
    muscle: str,
    # queries:StrengthQueries=Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    base_url = 'https://api.api-ninjas.com/v1/exercises?'

    return {"exercises": get_exercise_by_muscle(muscle, base_url)}
