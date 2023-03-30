import requests


class MuscleQueries:
    # base_url = 'https://api.api-ninjas.com/v1/exercises?'

    async def get_exercise_by_muscle(self):
        # headers = {'X-Api-Key': 'miZDGjvtBYyv9qSV1dIncw==jjYja7ggStstXS06'}
        # res = requests.get(self.base_url+f'type=strength&muscle={muscle}', headers={'X-Api-Key': 'miZDGjvtBYyv9qSV1dIncw==jjYja7ggStstXS06'})
        res = requests.get('https://api.api-ninjas.com/v1/exercises?type=strength&muscle=biceps', headers={'X-Api-Key': 'miZDGjvtBYyv9qSV1dIncw==jjYja7ggStstXS06'})
        print('the url we want', self.base_url+f'type=strength&muscle={muscle}')
        print("This is the res: ", res)
        return({"workouts": res.json()})
    
