import requests
import os
from .client import Queries
from models import (
    StrengthExerciseOut,
    StrengthWorkoutOut
)
from fastapi import(
    HTTPException,
    status
)
from typing import Union
from bson.objectid import ObjectId

api_key = os.environ["API_KEY"]

class StrengthQueries(Queries):
    base_url = 'https://api.api-ninjas.com/v1/exercises?'
    def get_exercise_by_muscle(self, muscle:str, user_id: str) -> StrengthExerciseOut:
        headers={'X-Api-Key': api_key}
        res = requests.get(self.base_url+f'type=strength&muscle={muscle}', headers=headers)
        return res.json()
    # base_url = 'https://api.api-ninjas.com/v1/exercises?'

    #api_key: 'miZDGjvtBYyv9qSV1dIncw==jjYja7ggStstXS06'
