from fastapi import APIRouter, Depends, Response
from queries.cardio import CardioQueries
from models import CardioExerciseIn, CardioExerciseOut, CardioList, CardioWorkoutIn, CardioWorkoutOut, Error
from auth import authenticator
from typing import Union



router = APIRouter()

@router.post('/api/exercise/cardio/', response_model=CardioExerciseOut)
def create_cardio_exercise(
    params: CardioExerciseIn,
    queries: CardioQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.create(params, user_id=account_data["id"])


@router.get('/api/exercise/cardio/', response_model=CardioList)
def get_all_cardio_exercises(
    queries: CardioQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return {"exercises": queries.get_all(user_id=account_data["id"])}


@router.get('/api/exercise/cardio/{id}/', response_model=Union[CardioExerciseOut, Error]
)
def get_cardio_exercise(
    id: str,
    queries: CardioQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.get_one(id, user_id=account_data["id"])


@router.put('/api/exercise/cardio/{id}/', response_model=Union[CardioExerciseOut, Error])
def update_cardio_exercise(
    id: str,
    exercise: CardioExerciseIn,
    queries: CardioQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.update(id, exercise, user_id=account_data["id"])


@router.delete('/api/exercise/cardio/{id}/', response_model=bool)
def delete_cardio_exercise(
    id: str,
    queries: CardioQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.delete_one(id, user_id=account_data["id"])
