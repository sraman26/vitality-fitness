from fastapi import APIRouter, Depends
import os
from serpapi import GoogleSearch
from queries.workouts import WorkoutQueries
from typing import Union
from models import (StrengthWorkoutOut, Error)

router = APIRouter()
youtube_api_key = os.environ["YOUTUBE_VIDEO_API"]


def get_youtube_result(params):
    search = GoogleSearch(params)
    results = search.get_dict()
    video_results = results["video_results"][0]["link"]
    video_results = video_results.split("=")
    video_results = video_results[1]
    return video_results


@router.get("/api/youtube/cardio/{search}")
def get_youtube_video(search: str):
    youtube_params = {
        "engine": "youtube",
        "search_query": search,
        "api_key": youtube_api_key,
    }
    return get_youtube_result(youtube_params)

@router.get("/api/youtube/strength/{id}")
def get_youtube_video(
    id: str,
    queries: WorkoutQueries = Depends()
):
    return queries.get_youtube_list(id)
