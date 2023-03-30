from models import CardioExerciseIn, CardioExerciseOut, Error, CardioWorkoutIn, CardioWorkoutOut
from .client import Queries
from fastapi import HTTPException, status
from bson.objectid import ObjectId
from typing import Union

# from typing import List


class CardioQueries(Queries):
    COLLECTION = "cardio"


    def create(self, info: CardioExerciseIn, user_id: str) -> CardioExerciseOut:
        props = info.dict()
        props["user_id"] = user_id # Saved
        self.collection.insert_one(props)
        props["id"] = str(props["_id"]) # Not Saved
        return CardioExerciseOut(**props)


    def get_all(self, user_id: str) -> list[CardioExerciseOut]:
        CardioExercises = []
        for exercise in self.collection.find({"user_id": user_id}):
            exercise["id"] = str(exercise["_id"])
            CardioExercises.append(CardioExerciseOut(**exercise))
        return CardioExercises


    def get_one(self, id: str, user_id: str) -> Union[CardioExerciseOut, Error]:
        try:
            result = self.collection.find_one({"_id": ObjectId(id), "user_id": user_id})
            result["id"] = str(result["_id"])
            return result
        except Exception as e:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Bad Request, could not find Workout ID."
            )


    def update(self, id: str, exercise: CardioExerciseIn, user_id: str) -> Union[CardioExerciseOut, Error]:
        try:
            result = self.collection.find_one({"_id": ObjectId(id), "user_id": user_id})
            temp = exercise.dict()
            result["id"] = str(result["_id"])
            result["name"] = temp["name"]
            newvalues = {"$set": result}
            self.collection.update_one({
                "_id": ObjectId(id),
                }, newvalues)
            result = self.collection.find_one({"_id": ObjectId(id), "user_id": user_id})
            return result
        except Exception as e:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Bad Request, could not find Workout ID."
            )


    def delete(self, id: str, user_id: str) -> Union[bool, Error]:
        try:
            result = self.collection.delete_one({"_id": ObjectId(id), "user_id": user_id})
            return result.deleted_count == 1
        except:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Bad Request, could not find Workout ID."
            )