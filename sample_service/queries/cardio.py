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
            CardioExercises.append(CardioExerciseOut(**exercise))
        return CardioExercises
        # try:
        # except:
        #     return "Error Creating Cardio Workout"


    def get_one(self, id: str) -> CardioExerciseOut :
        result = self.collection.find_one({"_id": ObjectId(id)})
        result["id"] = str(result["_id"])
        return result


    def delete_one(self, id: str) -> bool:
        result = self.collection.delete_one({"_id": ObjectId(id)})
        return result.deleted_count == 1


    def update(self, id: str, exercise: CardioExerciseIn) -> bool:
        result = self.collection.find_one({"_id": ObjectId(id)})
        temp = exercise.dict()
        result["id"] = str(result["_id"])
        result["name"] = temp["name"]
        newvalues = {"$set": result}

        output = (self.collection.update_one({
            "_id": ObjectId(id),
            }, newvalues))

        return output.matched_count == 1
