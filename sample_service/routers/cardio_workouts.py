from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from models import (
    CardioWorkoutIn,
    CardioWorkoutOut,
    CardioWorkoutList,
    Error
)

from queries.cardio_workouts import CardioWorkoutQueries
from auth import authenticator
from typing import Union

router = APIRouter()


@router.post('/api/workouts/cardio/')
def create_cardio_workout(
    params: CardioWorkoutIn,
    queries: CardioWorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.create(params, user_id=account_data['id'])


@router.get('/api/workouts/cardio/', response_model = CardioWorkoutList)
def get_all_cardio_workouts(
    queries: CardioWorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return {"workouts": queries.get_all(user_id=account_data['id'])}


@router.get('/api/workouts/cardio/{id}/', response_model = Union[CardioWorkoutOut,Error])
def get_one_cardio_workout(
    id:str,
    queries: CardioWorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    try:
        return queries.get_one(id, user_id=account_data['id'])
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Bad Request, could not find Workout ID"
        )


@router.put('/api/workouts/cardio/{id}/', response_model = Union[CardioWorkoutOut, Error])
def update_cardio_workout(
    id:str,
    workout: CardioWorkoutIn,
    queries: CardioWorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    try:
        return queries.update(id, workout, user_id=account_data['id'])
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Bad Request, could not find Workout ID."
        )


@router.delete('/api/workouts/cardio/{id}/', response_model = Union[bool,Error])
def delete_cardio_workout(
    id:str,
    queries: CardioWorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    try:
        return queries.delete(id, user_id=account_data['id'])
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Bad Request, could not find Workout ID."
        )

