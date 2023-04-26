from fastapi import APIRouter
import os
from serpapi import GoogleSearch

router = APIRouter()
youtube_api_key = os.environ["YOUTUBE_VIDEO_API"]


def get_youtube_result(params):
    search = GoogleSearch(params)
    results = search.get_dict()
    video_results = results["video_results"][0]["link"]
    video_results = video_results.split("=")
    video_results = video_results[1]
    return video_results


@router.get("/api/youtube/")
def get_youtube_video(search: str):
    youtube_params = {
        "engine": "youtube",
        "search_query": search,
        "api_key": youtube_api_key,
    }
    return get_youtube_result(youtube_params)
