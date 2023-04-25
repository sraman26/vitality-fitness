from fastapi.testclient import TestClient
from main import app
from auth import authenticator
from models import CardioExerciseIn, CardioExerciseOut
from queries.cardio_exercises import CardioQueries

client = TestClient(app)


def fake_get_current_account_data():
    return {"id": "fakeuser"}


class FakeCardioQueries:
    def get_all(self, user_id: str):
        return [
            {
                "name": "run",
                "id": "64460b61117c1ccb4e48882d",
                "user_id": user_id
             }
            ]

    def create(
            self, params: CardioExerciseIn, user_id: str
            ) -> CardioExerciseOut:
        props = params.dict()
        props["id"] = "fake_object_id"
        props["user_id"] = user_id
        return CardioExerciseOut(**props)


def test_get_all_cardio_exercises():
    overrides = {
        CardioQueries: FakeCardioQueries,
        authenticator.get_current_account_data: fake_get_current_account_data,
    }
    app.dependency_overrides = overrides

    res = client.get("/api/exercise/cardio/")
    data = res.json()

    assert "exercises" in data
    assert data["exercises"][0]["user_id"] == "fakeuser"
    assert res.status_code == 200
    app.dependency_overrides = {}


def test_create_cardio_exercise():
    overrides = {
        CardioQueries: FakeCardioQueries,
        authenticator.get_current_account_data: fake_get_current_account_data,
    }
    app.dependency_overrides = overrides
    input = {"name": "running"}
    res = client.post("/api/exercise/cardio/", json=input)
    data = res.json()

    assert res.status_code == 200
    assert data["id"] == "fake_object_id"
