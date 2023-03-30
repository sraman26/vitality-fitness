from queries.client import Queries
from models import (
    CardioExerciseIn,
    CardioExerciseOut,
    CardioWorkoutIn,
    CardioWorkoutOut,
    CardioWorkoutList,
    Error
)

from fastapi import(
    HTTPException,
    status
)

from typing import Union
from bson.objectid import ObjectId




class CardioWorkoutQueries(Queries):
    COLLECTION = "Cardio Workouts"

    def create(self, params: CardioWorkoutIn, user_id:str) -> CardioWorkoutOut:
        workout = params.dict()
        workout['user_id'] = user_id
        workout['date'] = str(workout['date'])
        self.collection.insert_one(workout)
        workout['id'] = str(workout['_id'])

        return CardioWorkoutOut(**workout)

    def get_all(self, user_id:str) -> list[CardioWorkoutOut]:
        CardioWorkouts = []
        for workout in self.collection.find({"user_id":user_id}):
            workout["id"] = str(workout["_id"])
            CardioWorkouts.append(CardioWorkoutOut(**workout))
        return CardioWorkouts


    def get_one(self, id: str, user_id:str) -> Union[CardioWorkoutOut, Error]:
        try:
            result = self.collection.find_one({"_id":ObjectId(id), "user_id":user_id})
            result["id"]=str(result["_id"])
            return result
        except Exception as e:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Bad Request, could not find Workout ID"
            )


    def update(self, id:str, workout:CardioWorkoutIn, user_id:str) -> Union[CardioWorkoutOut, Error]:
        try:
            result = self.collection.find_one({"_id":ObjectId(id), "user_id":user_id})
            temp = workout.dict()
            for key, value in temp.items():
                result[key]=value
            result['date'] = str(result['date'])
            result['id'] = str(result["_id"])

            newvalues = {'$set':result}
            self.collection.update_one({"_id":ObjectId(id)}, newvalues)
            output = self.collection.find_one({"_id":ObjectId(id), "user_id":user_id})

            return output
        except Exception as e:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Bad Request, could not find Workout ID."
            )


    def delete(self, id:str, user_id:str) -> Union[bool, Error]:
        try:
            result = self.collection.delete_one({"_id":ObjectId(id), "user_id":user_id})
            return result.deleted_count == 1
        except Exception as e:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Bad Request, could not find Workout ID."
            )
