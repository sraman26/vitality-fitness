from fastapi.testclient import TestClient
from main import app
from queries.workouts import WorkoutQueries
from auth import VitalityAuthenticator
import os
from auth import authenticator


client = TestClient(app)


def fake_get_current_account_data():
    return {"id": "fakeuser"}


class FakeWorkoutQueries:
    def get_all_incompleted_workouts(self, user_id: str):
        return [
            {
                "workout_name": "strawbeerrry",
                "type": "Cardio",
                "date": "2018-09-27",
                "id": "643da6d5242ef82fa0ec1c41",
                "user_id": user_id,
                "status": "Incomplete",
            }
        ]

    def get_all_completed_workouts(self, user_id: str):
        return [
            {
                "workout_name": "strawbeerrry",
                "type": "Cardio",
                "date": "2018-09-27",
                "id": "643da6d5242ef82fa0ec1c41",
                "user_id": user_id,
                "status": "Incomplete",
            }
        ]

    def get_all_cardio_workouts(self, user_id: str):
        return [
            {
                "workout_name": "run",
                "exercise": "run",
                "date": "2023-12-31",
                "type": "Cardio",
                "duration": "30 min",
                "notes": "gui ehguhreui gher iugheriu",
                "status": "Incomplete",
                "id": "643da6c9242ef82fa0ec1c40",
                "user_id": user_id,
            },
        ]



def test_get_all_incompleted_workouts():
    # Arrange
    overrides = {
        WorkoutQueries: FakeWorkoutQueries,
        authenticator.get_current_account_data: fake_get_current_account_data,
    }
    app.dependency_overrides = overrides

    # Act
    res = client.get("/api/workouts/incompleted")
    data = res.json()
    print(data)

    # Assert
    assert res.status_code == 200
    assert "workouts" in data
    assert data["workouts"][0]["user_id"] == "fakeuser"
    app.dependency_overrides = {}


def test_get_all_completed_workouts():
    # Arrange
    overrides = {
        WorkoutQueries: FakeWorkoutQueries,
        authenticator.get_current_account_data: fake_get_current_account_data,
    }
    app.dependency_overrides = overrides
    # Act
    res = client.get("api/workouts/completed")
    data = res.json()
    print(data)
    # Assert
    assert res.status_code == 200
    assert "workouts" in data
    assert data["workouts"][0]["user_id"] == "fakeuser"
    app.dependency_overrides = {}


def test_get_all_cardio_workouts():
    # Arrange
    overrides = {
        WorkoutQueries: FakeWorkoutQueries,
        authenticator.get_current_account_data: fake_get_current_account_data,
    }
    app.dependency_overrides = overrides

    # Act
    res = client.get("/api/workouts/cardio")
    data = res.json()
    print(data)

    # Assert
    assert res.status_code == 200
    assert "workouts" in data
    assert data["workouts"][0]["user_id"] == "fakeuser"
    assert data["workouts"][0]["type"] == "Cardio"
    app.dependency_overrides = {}
