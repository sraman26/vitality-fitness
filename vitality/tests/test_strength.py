from fastapi.testclient import TestClient
from main import app
from auth import authenticator
from models import StrengthWorkoutIn, StrengthWorkoutOut
from queries.workouts import WorkoutQueries

client = TestClient(app)


def fake_get_current_account_data():
    return {"id": "fakeuser"}


class FakeStrengthQueries:
    def get_all_strength_workouts(self, user_id: str):
        return [
            {
                "workout_name": "run",
                "exercise": "run",
                "date": "2023-12-31",
                "type": "Strength",
                "duration": "30 min",
                "notes": "gui ehguhreui gher iugheriu",
                "status": "Incomplete",
                "id": "643da6c9242ef82fa0ec1c40",
                "user_id": user_id,
            },
        ]

    def create_strength_workout(
        self, params: StrengthWorkoutIn, user_id: str
    ) -> StrengthWorkoutOut:
        props = params.dict()
        props["id"] = "fake_object_id"
        props["user_id"] = user_id
        props["date"] = "2023-04-24"
        return StrengthWorkoutOut(**props)


def test_get_all_strength_workouts():
    # Arrange
    overrides = {
        WorkoutQueries: FakeStrengthQueries,
        authenticator.get_current_account_data: fake_get_current_account_data,
    }
    app.dependency_overrides = overrides

    # Act
    res = client.get("/api/workouts/strength")
    data = res.json()

    # Assert
    assert res.status_code == 200
    assert "workouts" in data
    # assert data["workouts"][0]["user_id"] == "fakeuser"
    assert data["workouts"][0]["type"] == "Strength"
    app.dependency_overrides = {}


def test_create_strength_workout():
    overrides = {
        WorkoutQueries: FakeStrengthQueries,
        authenticator.get_current_account_data: fake_get_current_account_data,
    }
    app.dependency_overrides = overrides
    input = {
        "workout_name": "string",
        "exercises": [],
        "date": "2023-04-24",
        "type": "strength",
        "status": "Incomplete",
    }
    res = client.post("api/workouts/strength/", json=input)
    data = res.json()

    assert res.status_code == 200
    assert data["id"] == "fake_object_id"
