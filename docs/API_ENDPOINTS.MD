## Base Endpoints:
Users (create/update/delete/login/logout)
Workout (create/get/delete/update)

## Base URL:
Users:
    POST: /api/accounts/
    LOGIN (POST): /token/
    LOGOUT (DELETE): /token/
    GET TOKEN (GET): /token/

Workout:
    GET ALL COMPLETED Workouts: api/workouts/completed
    GET ALL INCOMPLETED Workouts: api/workouts/incompleted

    POST: api/workouts/cardio/
    GET: api/workouts/cardio/<int:id>/
    DELETE: api/workouts/cardio/<int:id>/
    UPDATE: api/workouts/cardio/<int:id>/

    POST: api/workouts/strength/
    GET: api/workouts/strength/<int:id>/
    DELETE: api/workouts/strength/<int:id>/
    UPDATE: api/workouts/strength/<int:id>

## Users:
POST: /api/accounts/
    Endpoint path: /api/accounts/
    Endpoint method: POST

    Request shape (form):
        {
            email: string,
            password: string,
            full_name: string
        }

    Response: Account information of new account
    Response shape (JSON):
        {
        "access_token": "string",
        "token_type": "Bearer",
        "account": {
            "id": "string",
            "email": "string",
            "full_name": "string"
            }
        }

LOGIN (POST): /token/
    Endpoint path: /token/
    Endpoint method: POST

    Request shape (form):
        {
            username: string,
            password: string
        }

    Response: Account information and a token
    Response shape:
    Response shape (JSON):
        {
            "access token": string,
            "token-type": "Bearer"
        }

LOGOUT (DELETE): /api/accounts/token/
    Endpoint path: /api/accounts/token/
    Endpoint method: DELETE

    Headers:
        Authorization: Bearer token
    Response shape (JSON):
        {
            bool
        }

## Workout (Muscle)
POST: api/workouts/strength/:
    Endpoint path: /api/workouts/strength/
    Endpoint method: POST

    Headers:
        Authorization: Bearer token

    Request shape (form):
        {
        "workout_name": "string",
        "exercises": [
            {
            "name": "string",
            "muscle": "string",
            "notes": "string",
            "reps": "string"
            }
        ],
        "date": "date",
        "type": "string",
        "status": "string"
        }

    Response: Adds to Exercise Database
    Response shape (JSON):
        {
        "workout_name": "string",
        "exercises": [
            {
            "name": "string",
            "muscle": "string",
            "notes": "string",
            "reps": "string"
            }
        ],
        "date": "2023-04-25",
        "type": "string",
        "status": "Incomplete",
        "id": "6447f4112e21cec31256b662",
        "user_id": "642f3815c75141cf40920707"
        }

GET ALL INCOMPLETED WORKOUTS (homepage): api/workouts/incompleted
    Endpoint path: /api/workouts/
    Endpoint method: GET

    Headers:
        Authorization: Bearer token
    Response: Grabs all information to display
    Response shape (JSON):
        {
        workout: [
            {
            "workout_name": "string",
            "type": "string",
            "date": "string",
            "id": "string",
            "user_id": "string",
            "status": "string"
            },
        ]
    }

GET ALL COMPLETED WORKOUTS (homepage): api/workouts/completed
    Endpoint path: /api/workouts/
    Endpoint method: GET

    Headers:
        Authorization: Bearer token

    Response: Grabs all information to display
    Response shape (JSON):
        {
        workout: [
            {
            "workout_name": "string",
            "type": "string",
            "date": "string",
            "id": "string",
            "user_id": "string",
            "status": "string"
            },
        ]
    }

GET: api/workouts/strength/<int:id>/
    Endpoint path: /api/workouts/strength/<int:id>/
    Endpoint method: GET

    Headers:
        Authorization: Bearer token

    Request shape (form):
        {
            "id": "string"
        }

    Response: Selects the workout with regard to strength to display
    Response shape (JSON):
        {
        "workout_name": "string",
        "exercises": [
            {
            "name": "string",
            "muscle": "string",
            "notes": "string",
            "reps": "string"
            }
        ],
        "date": "string",
        "type": "string",
        "status": "string",
        "id": "string",
        "user_id": "string"
        }

DELETE: api/workouts/strength/<int:id>/
    Endpoint path: api/workouts/strength/<int:id>/
    Endpoint method: DELETE

    Headers:
        Authorization: Bearer token

    Request shape (form):
        {
            "id": "string"
        }

    Response: Selects the workout with regard to options of muscle/cardio by id to delete
    Response shape (JSON):
        {
            bool
        }


UPDATE: api/workouts/strength/<int:id>/
    Endpoint path: api/workouts/strength/<int:id>
    Endpoint method: PUT

    Headers:
        Authorization: Bearer token

    Request shape (form):
        {
        "workout_name": "string",
        "exercises": [
            {
            "name": "string",
            "muscle": "string",
            "notes": "string",
            "reps": "string"
            }
        ],
        "date": "date",
        "type": "string",
        "status": "string"
        }

    Response: Users will receive a confirmation of their updated workout displayed as a workout details page
    Response shape (JSON):
        {
        "workout_name": "string",
        "exercises": [
            {
            "name": "string",
            "muscle": "string",
            "notes": "string",
            "reps": "string"
            }
        ],
        "date": "string",
        "type": "string",
        "status": "string",
        "id": "string",
        "user_id": "string"
        }

## Workout (Cardio)
POST: api/workouts/cardio/:
    Endpoint path: /api/workouts/cardio/
    Endpoint method: POST

    Headers:
        Authorization: Bearer token

    Request shape (form):
        {
        "workout_name": "string",
        "exercise": "string",
        "date": "date",
        "type": "string",
        "duration": "string",
        "notes": "string",
        "status": "string"
        }

    Response: Adds to Exercise Database
    Response shape (JSON):
        {
        "workout_name": "string",
        "exercise": "string",
        "date": "string",
        "type": "string",
        "duration": "string",
        "notes": "string",
        "status": "string",
        "id": "string",
        "user_id": "string"
        }


GET: api/workouts/cardio/<int:id>/
    Endpoint path: /api/workouts/cardio/<int:id>/
    Endpoint method: PUT

    Headers:
        Authorization: Bearer token

    Request shape (form):
        {
            "id": "string"
        }

    Response Shape (JSON):
        {
        "workout_name": "string",
        "exercise": "string",
        "date": "string",
        "type": "string",
        "duration": "string",
        "notes": "string",
        "status": "string",
        "id": "string",
        "user_id": "string"
        }

DELETE: api/workouts/cardio/<int:id>/
    Endpoint path: api/workouts/cardio/<int:id>/
    Endpoint method: DELETE

    Headers:
        Authorization: Bearer token

    Request shape (form):
        {
            "id": "string"
        }

    Response shape (JSON):
    {
        bool
    }

UPDATE: api/workouts/cardio/<int:id>/ (FIX)
    Endpoint path: api/workouts/cardio/<int:id>
    Endpoint method: PUT


    Headers:
        Authorization: Bearer token

    Request shape (form):
        {
            "id": "string"
        }

    Response Shape (JSON):
        {
        "workout_name": "string",
        "exercise": "string",
        "date": "string",
        "type": "string",
        "duration": "string",
        "notes": "string",
        "status": "string",
        "id": "string",
        "user_id": "string"
        }
