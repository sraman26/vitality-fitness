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
from queries.strength_api import StrengthQueries
from auth import authenticator

router = APIRouter()


@router.get('/api/exercise/strength/{muscle}/', response_model=StrengthExerciseOut)
def get_muscle(
    muscle: str,
    queries:StrengthQueries=Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return {"workouts": queries.get_exercise_by_muscle(muscle, user_id=account_data["id"])}
