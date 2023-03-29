from fastapi import APIRouter, Depends
from queries.cardio import CardioQueries
from models import CardioExerciseIn, CardioExerciseOut, CardioList, CardioWorkoutIn, CardioWorkoutOut


router = APIRouter()

@router.post('/api/workouts/cardio/', response_model=CardioExerciseOut)
def create_cardio_workout(
    params: CardioExerciseIn,
    queries: CardioQueries = Depends()
):
    return queries.create(params)


@router.get('/api/workouts/cardio/', response_model=CardioList)
def get_all_cardio_workouts(
    queries: CardioQueries = Depends(),
):
    return {"exercises": queries.get_all()}
