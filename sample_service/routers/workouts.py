from fastapi import APIRouter, Depends, HTTPException, status

from typing import Union
from auth import authenticator
from queries.workouts import WorkoutQueries

from models import (
    StrengthWorkoutIn,
    StrengthWorkoutOut,
    StrengthWorkoutList,
    CardioWorkoutIn,
    CardioWorkoutOut,
    CardioWorkoutList,
    Error,
    WorkoutList,
)


router = APIRouter()


@router.post("/api/workouts/strength/", tags=["Strength"])
def create_strength_workout(
    params: StrengthWorkoutIn,
    queries: WorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.create_strength_workout(params, user_id=account_data["id"])


@router.get(
    "/api/workouts/strength/",
    tags=["Strength"],
    response_model=StrengthWorkoutList,
)
def get_all_strength_workouts(
    queries: WorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return {"workouts":
            queries.get_all_strength_workouts(user_id=account_data["id"])}


@router.get(
    "/api/workouts/strength/{id}/",
    tags=["Strength"],
    response_model=Union[StrengthWorkoutOut, Error],
)
def get_one_strength_workout(
    id: str,
    queries: WorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return queries.get_one_strength_workout(id, user_id=account_data["id"])
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bad request, could not find Workout ID",
        )


@router.put(
    "/api/workouts/strength/{id}/",
    tags=["Strength"],
    response_model=Union[StrengthWorkoutOut, Error],
)
def update_strength_workout(
    id: str,
    workout: StrengthWorkoutIn,
    queries: WorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return queries.update_strength_workout(
            id, workout, user_id=account_data["id"]
            )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bad Request, could not find Workout ID.",
        )


@router.delete(
    "/api/workouts/strength/{id}/",
    tags=["Strength"],
    response_model=Union[bool, Error],
)
def delete_strength_workout(
    id: str,
    queries: WorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return queries.delete_strength_workout(id, user_id=account_data["id"])
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bad Request, could not find Workout ID.",
        )


# _________________________________________________________________________________________________________________


@router.post("/api/workouts/cardio/", tags=["Cardio"])
def create_cardio_workout(
    params: CardioWorkoutIn,
    queries: WorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.create_cardio_workout(params, user_id=account_data["id"])


@router.get("/api/workouts/cardio/",
            tags=["Cardio"], response_model=CardioWorkoutList
            )
def get_all_cardio_workouts(
    queries: WorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return {"workouts":
            queries.get_all_cardio_workouts(user_id=account_data["id"])
            }


@router.get(
    "/api/workouts/cardio/{id}/",
    tags=["Cardio"],
    response_model=Union[CardioWorkoutOut, Error],
)
def get_one_cardio_workout(
    id: str,
    queries: WorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return queries.get_one_cardio_workout(id, user_id=account_data["id"])
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bad Request, could not find Workout ID",
        )


@router.put(
    "/api/workouts/cardio/{id}/",
    tags=["Cardio"],
    response_model=Union[CardioWorkoutOut, Error],
)
def update_cardio_workout(
    id: str,
    workout: CardioWorkoutIn,
    queries: WorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return queries.update_cardio_workout(
            id, workout, user_id=account_data["id"]
            )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bad Request, could not find Workout ID.",
        )


@router.delete(
    "/api/workouts/cardio/{id}/",
    tags=["Cardio"],
    response_model=Union[bool, Error],
)
def delete_cardio_workout(
    id: str,
    queries: WorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return queries.delete_cardio_workout(
            id, user_id=account_data["id"]
            )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bad Request, could not find Workout ID.",
        )


# ______________________________________________________________________________________________________________


@router.get("/api/workouts/incompleted",
            tags=["Workouts"], response_model=WorkoutList
            )
def get_all_incompleted_workouts(
    queries: WorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return {
        "workouts":
        queries.get_all_incompleted_workouts(user_id=account_data["id"]
                                             )
    }


@router.get("/api/workouts/completed/",
            tags=["Workouts"], response_model=WorkoutList
            )
def get_all_completed_workouts(
    queries: WorkoutQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return {"workouts":
            queries.get_all_completed_workouts(user_id=account_data["id"])
            }
