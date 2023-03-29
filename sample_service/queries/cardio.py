from models import CardioExerciseIn, CardioExerciseOut, CardioWorkoutIn, CardioWorkoutOut
from .client import Queries
from bson.objectid import ObjectId
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
            print((exercise["_id"]))
            CardioExercises.append(CardioExerciseOut(**exercise))
        return CardioExercises

        # try:

        # except:
        #     return "Error Creating Cardio Workout"

    def get_one(self, id: str) -> CardioExerciseOut :
        print(self.collection.find_one({"_id": ObjectId(id)}))
        result = self.collection.find_one({"_id": ObjectId(id)})
        result["id"] = str(result["_id"])
        return result
