from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from typing import List
from muscle_model import MuscleOut
from queries.muscle_api import MuscleQueries

router = APIRouter()
@router.get('/{muscle}', response_model=List)
def get_muscles(muscle: str, queries: MuscleQueries=Depends()):
    return queries.get_exercise_by_muscle()


# base_url = 'https://api.api-ninjas.com/v1/exercises?'
# add_on = 'type=strength&muscle={variable}'

# search = base_url + add_on
# response = requests.get(search, headers={'X-Api-Key': 'miZDGjvtBYyv9qSV1dIncw==jjYja7ggStstXS06'})
# if response.status_code == requests.codes.ok:
#     print(response.text)
# else:
#     print("Error:", response.status_code, response.text)