from queries.client import Queries
from models import (
    StrengthWorkoutIn,
    StrengthWorkoutOut,
    StrengthWorkoutList,
    StrengthWorkoutReduce,
    Error
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
        result = self.collection.find_one({"_id":ObjectId(id), "user_id":user_id})
        result["id"] = str(result["_id"])
        return result
        


    def update(self, id:str, workout:StrengthWorkoutIn, user_id:str) -> Union[StrengthWorkoutOut, Error]:
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
        


    def delete(self, id:str, user_id:str) -> Union[bool, Error]:
        result = self.collection.delete_one({"_id":ObjectId(id), "user_id":user_id})
        return result.deleted_count == 1
        
