from models import CardioExerciseIn, CardioExerciseOut, CardioWorkoutIn, CardioWorkoutOut
from .client import Queries
# from typing import List


class CardioQueries(Queries):
    COLLECTION = "cardio"

    def create(self, info: CardioExerciseIn) -> CardioExerciseOut:
        props = info.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return CardioExerciseOut(**props)


    def get_all(self) -> list[CardioExerciseOut]:
        CardioExercises = []
        for exercise in self.collection.find():
            exercise["id"] = str(exercise["_id"])
            CardioExercises.append(CardioExerciseOut(**exercise))
        return CardioExercises

        # try:

        # except:
        #     return "Error Creating Cardio Workout"
