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
    username: string
    password: string
    confirm_password: string

    Response: Account information of new account
    Response shape (JSON):
        {
            “Success”: “Account created successfully”
        }

PUT: /api/accounts/<int:id>/
    Endpoint path: /api/accounts/<int:id>/
    Endpoint method: PUT

    Headers:
        Authorization: Bearer token
    Request shape (form):
    username: string
    password: string
    confirm_password: string
    Response: Account information of updated account
    Response shape (JSON):
        {
            “Success”: “Account updated successfully”
        }

DELETE: /api/accounts/<int:id>/
    Endpoint path: /api/accounts/<int:id>/
    Endpoint method: DELETE

    Headers:
        Authorization: Bearer token
    Request shape (form):
    Nothing to be passed in Body
    Response: Always true
    Response shape (JSON):
        {
            “Success”: “Account deactivated successfully”
        }

LOGIN (POST): /api/accounts/token/
    Endpoint path: api/accounts/token/
    Endpoint method: POST

    Request shape (form):
    username: string
    password: string

    Response: Account information and a token
    Response shape:
    Response shape (JSON):
        {
            "Account": token
        }

LOGOUT (DELETE): /api/accounts/token/
    Endpoint path: /api/accounts/token/
    Endpoint method: DELETE

    Headers:
        Authorization: Bearer token
    Response shape (JSON):
        {
            True
        }

## Workout (Muscle)
POST: api/workouts/strength/:
    Endpoint path: /api/workouts/strength/
    Endpoint method: POST

    Headers:
        Authorization: Bearer token
    Request shape (form):
        “name": string,
        “type”: string,
        “muscle”: string,
        “equipment": string,
        “instructions”: string
        “Date”: string

    Response: Adds to Exercise Database
    Response shape (JSON):
        {
            True
        }

GET ALL (homepage): api/workouts/
    Endpoint path: /api/workouts/
    Endpoint method: GET

    Headers:
        Authorization: Bearer token
    Response: Grabs all information to display
    Response shape (JSON):
        {
        workout: [
            “name": string,
            “type”: string,
            “date”: string,
            “Id”: int
        ]
    }

GET: api/workouts/strength/<int:id>/
    Endpoint path: /api/workouts/strength/<int:id>/
    Endpoint method: GET

    Query parameters:
        Id: identify which workout to update
    Headers:
        Authorization: Bearer token
    Response: Selects the workout with regard to strength to display
    Response shape (JSON):
        {
    Workout: [
            {
            “name": string,
            “reps”: string,
            “notes": string,
            “instructions”: string
            “Id”: int
            },
            {
            “name": string,
            “reps”: string,
            “notes": string,
            “instructions”: string
            “Id”: int
            },
                id: int, date:string
            ]
        }

DELETE: api/workouts/strength/<int:id>/
    Endpoint path: api/workouts/strength/<int:id>/
    Endpoint method: DELETE

    Query parameters:
        Id: identify which workout to update
    Headers:
        Authorization: Bearer token
    Response: Selects the workout with regard to options of muscle/cardio by id to delete
    Response shape (JSON):
        {
        “Success”: True
        }


UPDATE: api/workouts/strength/<int:id>/
    Endpoint path: api/workouts/strength/<int:id>
    Endpoint method: PUT

    Query parameters:
        Id: identify which workout to update
    Headers:
        Authorization: Bearer token
    Request shape (JSON):
        {
        Exercise: [{
            “name": string,
            “reps”: string,
            “notes": string,
            “instructions”: string
            “Id”: int
        },
        {
            “name": string,
            “reps”: string,
            “notes": string,
            “instructions”: string
            “Id”: int
        },
        id: int,
        Date:string
        ]
    }
    Response: Users will receive a confirmation of their updated workout displayed as a workout details page
    Response shape (JSON):
        {
        “Success”: True
        }

## Workout (Cardio)
POST: api/workouts/cardio/:
    Endpoint path: /api/workouts/cardio/
    Endpoint method: POST

    Headers:
        Authorization: Bearer token
    Response: Adds to Exercise Database
    Request shape (form):
        “name": string,
        “duration”: string,
        “instructions”: string
        “Date”: string
    Response shape (JSON):
        {
            “Success”: True
        }

GET ALL (homepage): api/workouts/
    Endpoint path: /api/workouts/
    Endpoint method: GET

    Headers:
        Authorization: Bearer token
    Request: Grabs all information to display
    Response shape (JSON):
        {
            workout: [
            {
                “name": string,
                “type”: string,
                “date”: string,
                “Id”: int
            },
            {
                “name": string,
                “type”: string,
                “date”: string,
                “Id”: int
            }
            ]
        }

GET: api/workouts/cardio/<int:id>/
    Endpoint path: /api/workouts/cardio/<int:id>/
    Endpoint method: PUT

    Headers:
        Authorization: Bearer token
    Request Shape (JSON):
        {
            workout: {
                “name": string,
                “duration”: string,
                “instructions”: string
                “Date”: string
                },
            id: int,
            date:string
        }

DELETE: api/workouts/cardio/<int:id>/
    Endpoint path: api/workouts/cardio/<int:id>/
    Endpoint method: DELETE

    Query parameters:
        Id: identify which workout to update
    Headers:
        Authorization: Bearer token
    Response shape (JSON):
    {
        “Success”: True
    }

UPDATE: api/workouts/cardio/<int:id>/ (FIX)
    Endpoint path: api/workouts/cardio/<int:id>
    Endpoint method: PUT

    Query parameters:
        Id: identify which workout to update
    Headers:
        Authorization: Bearer token
    Request shape (form):
    {
        “name": string,
        “duration”: string,
        “instructions”: string
        “Date”: string
        “Id” : int
    }
    Response shape (JSON):
    {
        “Success”: True
    }
