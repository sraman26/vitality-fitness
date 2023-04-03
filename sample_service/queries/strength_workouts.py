from queries.client import Queries
from models import (
    StrengthExercise,
    StrengthExerciseOut,
    StrengthWorkoutIn,
    StrengthWorkoutOut,
    StrengthWorkoutList,
    StrengthWorkoutReduce,
    Error
)

from fastapi import(
    HTTPException,
    status
)

from typing import Union
from bson.objectid import ObjectId


class StrengthWorkoutQueries(Queries):
    COLLECTION = "Strength Workouts"


    def create(self, params: StrengthWorkoutIn, user_id: str) -> StrengthWorkoutOut:

        workout = params.dict()
        workout['user_id'] = user_id
        workout['date'] = str(workout['date'])
        self.collection.insert_one(workout)
        workout['id'] = str(workout['_id'])

        return StrengthWorkoutOut(**workout)


    def get_all(self, user_id:str) -> list[StrengthWorkoutList]:
        StrengthWorkouts = []
        for workout in self.collection.find({"user_id": user_id}):
            workout["id"] = str(workout["_id"])
            StrengthWorkouts.append(StrengthWorkoutReduce(**workout))
        return StrengthWorkouts


    def get_one(self, id: str, user_id:str) -> Union[StrengthWorkoutOut, Error]:
        try:
            result = self.collection.find_one({"_id":ObjectId(id), "user_id":user_id})
            result["id"] = str(result["_id"])
            return result
        except Exception as e:
            raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST,
                detail = "Bad request, could not find Workout ID"
            )


    def update(self, id:str, workout:StrengthWorkoutIn, user_id:str) -> Union[StrengthWorkoutOut]:
        try:
            result = self.collection.find_one({"_id":ObjectId(id), "user_id":user_id})
            temp = workout.dict()
            for key,value in temp.items():
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
