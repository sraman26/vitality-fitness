from queries.client import Queries
from typing import Union
from bson.objectid import ObjectId

from models import (
    StrengthWorkoutIn,
    StrengthWorkoutOut,
    StrengthWorkoutList,
    StrengthWorkoutReduce,
    Error,
    CardioWorkoutIn,
    CardioWorkoutOut,
    Workouts,
    WorkoutList,
)


class WorkoutQueries(Queries):
    COLLECTION = "Workouts"

    def create_strength_workout(
        self, params: StrengthWorkoutIn, user_id: str
    ) -> StrengthWorkoutOut:
        workout = params.dict()
        workout["user_id"] = user_id
        workout["date"] = str(workout["date"])
        self.collection.insert_one(workout)
        workout["id"] = str(workout["_id"])

        return StrengthWorkoutOut(**workout)

    def get_all_strength_workouts(
        self, user_id: str
    ) -> list[StrengthWorkoutList]:
        StrengthWorkouts = []
        for workout in self.collection.find(
            {"user_id": user_id, "type": "Strength"}
        ):
            workout["id"] = str(workout["_id"])
            StrengthWorkouts.append(StrengthWorkoutReduce(**workout))
        return StrengthWorkouts

    def get_one_strength_workout(
        self, id: str, user_id: str
    ) -> Union[StrengthWorkoutOut, Error]:
        result = self.collection.find_one(
            {"_id": ObjectId(id), "user_id": user_id}
        )
        result["id"] = str(result["_id"])
        return result

    def update_strength_workout(
        self, id: str, workout: StrengthWorkoutIn, user_id: str
    ) -> Union[StrengthWorkoutOut, Error]:
        result = self.collection.find_one(
            {"_id": ObjectId(id), "user_id": user_id}
        )
        temp = workout.dict()
        for key, value in temp.items():
            result[key] = value
        result["date"] = str(result["date"])
        result["id"] = str(result["_id"])
        newvalues = {"$set": result}
        self.collection.update_one({"_id": ObjectId(id)}, newvalues)
        output = self.collection.find_one(
            {"_id": ObjectId(id), "user_id": user_id}
        )
        return output

    def delete_strength_workout(
        self, id: str, user_id: str
    ) -> Union[bool, Error]:
        result = self.collection.delete_one(
            {"_id": ObjectId(id), "user_id": user_id}
        )
        return result.deleted_count == 1

    # ________________________________________________________________________________________________________________________________________________________________

    def create_cardio_workout(
        self, params: CardioWorkoutIn, user_id: str
    ) -> CardioWorkoutOut:
        workout = params.dict()
        workout["user_id"] = user_id
        workout["date"] = str(workout["date"])
        self.collection.insert_one(workout)
        workout["id"] = str(workout["_id"])
        return CardioWorkoutOut(**workout)

    def get_all_cardio_workouts(self, user_id: str) -> list[CardioWorkoutOut]:
        CardioWorkouts = []
        for workout in self.collection.find(
            {"user_id": user_id, "type": "Cardio"}
        ):
            workout["id"] = str(workout["_id"])
            CardioWorkouts.append(CardioWorkoutOut(**workout))
        return CardioWorkouts

    def get_one_cardio_workout(
        self, id: str, user_id: str
    ) -> Union[CardioWorkoutOut, Error]:
        result = self.collection.find_one(
            {"_id": ObjectId(id), "user_id": user_id}
        )
        result["id"] = str(result["_id"])
        return result

    def update_cardio_workout(
        self, id: str, workout: CardioWorkoutIn, user_id: str
    ) -> Union[CardioWorkoutOut, Error]:
        result = self.collection.find_one(
            {"_id": ObjectId(id), "user_id": user_id}
        )
        temp = workout.dict()
        for key, value in temp.items():
            result[key] = value
        result["date"] = str(result["date"])
        result["id"] = str(result["_id"])

        newvalues = {"$set": result}
        self.collection.update_one({"_id": ObjectId(id)}, newvalues)
        output = self.collection.find_one(
            {"_id": ObjectId(id), "user_id": user_id}
        )
        return output

    def delete_cardio_workout(
        self, id: str, user_id: str
    ) -> Union[bool, Error]:
        result = self.collection.delete_one(
            {"_id": ObjectId(id), "user_id": user_id}
        )
        return result.deleted_count == 1

    # ________________________________________________________________________________________________________________________________________________________________

    def get_all_incompleted_workouts(self, user_id: str) -> list[Workouts]:
        Workout_List = []
        for workout in self.collection.find(
            {"user_id": user_id, "status": "Incomplete"}
        ).sort("date"):
            workout["id"] = str(workout["_id"])
            workout["date"] = str(workout["date"])
            print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", workout)
            Workout_List.append(Workouts(**workout))
        return Workout_List

    def get_all_completed_workouts(self, user_id: str) -> list[Workouts]:
        Workout_List = []
        for workout in self.collection.find(
            {"user_id": user_id, "status": "Complete"}
        ).sort("date", -1):
            workout["id"] = str(workout["_id"])
            workout["date"] = str(workout["date"])
            Workout_List.append(Workouts(**workout))
        return Workout_List
