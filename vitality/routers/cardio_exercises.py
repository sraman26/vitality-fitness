from fastapi import APIRouter, Depends
from queries.cardio_exercises import CardioQueries
from models import (
    CardioExerciseIn,
    CardioExerciseOut,
    CardioList,
    Error,
)
from auth import authenticator
from typing import Union
from fastapi import HTTPException, status

router = APIRouter()


@router.post("/api/exercise/cardio/", response_model=CardioExerciseOut)
def create_cardio_exercise(
    params: CardioExerciseIn,
    queries: CardioQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.create(params, user_id=account_data["id"])


@router.get("/api/exercise/cardio/", response_model=CardioList)
def get_all_cardio_exercises(
    queries: CardioQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return {"exercises": queries.get_all(user_id=account_data["id"])}


@router.get(
    "/api/exercise/cardio/{id}/",
    response_model=Union[CardioExerciseOut, Error]
)
def get_cardio_exercise(
    id: str,
    queries: CardioQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return queries.get_one(id, user_id=account_data["id"])
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bad Request, could not find Workout ID.",
        )


@router.put(
    "/api/exercise/cardio/{id}/",
    response_model=Union[CardioExerciseOut, Error]
)
def update_cardio_exercise(
    id: str,
    exercise: CardioExerciseIn,
    queries: CardioQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return queries.update(id, exercise, user_id=account_data["id"])
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bad Request, could not find Workout ID.",
        )


@router.delete("/api/exercise/cardio/{id}/", response_model=Union[bool, Error])
def delete_cardio_exercise(
    id: str,
    queries: CardioQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return queries.delete(id, user_id=account_data["id"])
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bad Request, could not find Workout ID.",
        )
