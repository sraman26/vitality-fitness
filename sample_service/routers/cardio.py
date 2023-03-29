from fastapi import APIRouter, Depends
from queries.cardio import CardioQueries
from models import CardioExerciseIn, CardioExerciseOut, CardioList, CardioWorkoutIn, CardioWorkoutOut


router = APIRouter()

@router.post('/api/exercise/cardio/', response_model=CardioExerciseOut)
def create_cardio_exercise(
    params: CardioExerciseIn,
    queries: CardioQueries = Depends()
):
    return queries.create(params)


@router.get('/api/exercise/cardio/', response_model=CardioList)
def get_all_cardio_exercises(
    queries: CardioQueries = Depends(),
):
    return {"exercises": queries.get_all()}


@router.get('/api/exercise/cardio/{id}/', response_model=CardioExerciseOut
)
def get_cardio_exercise(
    id: str,
    queries: CardioQueries = Depends()
):
    return queries.get_one(id)


@router.put('/api/exercise/cardio/{id}/', response_model=bool)
def update_cardio_exercise(
    id: str,
    exercise: CardioExerciseIn,
    queries: CardioQueries = Depends(),
):
    return queries.update(id, exercise)


@router.delete('/api/exercise/cardio/{id}/', response_model=bool)
def delete_cardio_exercise(
    id: str,
    queries: CardioQueries = Depends()
):
    return queries.delete_one(id)
