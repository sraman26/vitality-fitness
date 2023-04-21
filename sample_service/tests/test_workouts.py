from fastapi.testclient import TestClient
from main import app
from queries.workouts import WorkoutQueries
from auth import VitalityAuthenticator
import os


client = TestClient(app)
authenticator = VitalityAuthenticator(os.environ["SIGNING_KEY"])


def fake_get_current_account_data():
    return {"id": "643d710afd21243030915ebb"}


class FakeWorkoutQueries:
    def get_all_incompleted_workouts(self, user_id: str):
        return [
            {
                "workout_name": "strawbeerrry",
                "type": "Cardio",
                "date": "2018-09-27",
                "id": "643da6d5242ef82fa0ec1c41",
                "user_id": "643d710afd21243030915ebb",
                "status": "Incomplete",
            },
            {
                "workout_name": "snowball fight",
                "type": "Cardio",
                "date": "2023-12-24",
                "id": "643da768242ef82fa0ec1c49",
                "user_id": "643d710afd21243030915ebb",
                "status": "Incomplete",
            },
        ]


def test_get_all_incompleted_workouts():
    # Arrange
    app.dependency_overrides[WorkoutQueries] = FakeWorkoutQueries
    # app.dependency_overrides[
    #     authenticator.get_current_account_data
    # ] = fake_get_current_account_data

    # Act
    res = client.get("/api/workouts/incompleted")
    print(res.json())
    # data = res.json()
    # print(data)

    # Assert
    assert res.status_code == 200


# def test_get_all_completed_workouts():
#     # Arrange

#     # Act
#     res = client.get("api/workouts/completed")
#     # Assert
#     assert res.status_code == 200
