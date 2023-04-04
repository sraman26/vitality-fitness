from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from models import (
    StrengthWorkoutIn,
    StrengthWorkoutOut,
    StrengthWorkoutList,
    Error
)

from typing import Union
from auth import authenticator
from queries.strength_workouts import StrengthWorkoutQueries

router = APIRouter()


@router.post('/api/workouts/strength/')
def create_strength_workout(
    params: StrengthWorkoutIn,
    queries: StrengthWorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.create(params, user_id=account_data['id'])


@router.get('/api/workouts/strength/', response_model = StrengthWorkoutList)
def get_all_strength_workouts(
    queries: StrengthWorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return {"workouts": queries.get_all(user_id=account_data['id'])}


@router.get('/api/workouts/strength/{id}/', response_model = Union[StrengthWorkoutOut, Error])
def get_one_strength_workout(
    id:str,
    queries: StrengthWorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    try:
        return queries.get_one(id, user_id=account_data['id'])
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Bad request, could not find Workout ID"
        )


@router.put('/api/workouts/strength/{id}/', response_model = Union[StrengthWorkoutOut, Error])
def update_strength_workout(
    id:str,
    workout: StrengthWorkoutIn,
    queries: StrengthWorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    try:
        return queries.update(id, workout, user_id=account_data['id'])
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Bad Request, could not find Workout ID."
        )


@router.delete('/api/workouts/strength/{id}/', response_model = Union[bool,Error])
def delete_strength_workout(
    id:str,
    queries: StrengthWorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    try:
        return queries.delete(id, user_id=account_data['id'])
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Bad Request, could not find Workout ID."
        )