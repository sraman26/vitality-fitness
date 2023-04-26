api_key = "0dbc30a4ac9d545d180d54a3ec5833ea1c1507ef86506afedfcec97c5772fc23"


from serpapi import GoogleSearch

params = {
    "engine": "youtube",
    "search_query": "star wars",
    "api_key": "0dbc30a4ac9d545d180d54a3ec5833ea1c1507ef86506afedfcec97c5772fc23",
}

search = GoogleSearch(params)
results = search.get_dict()
video_results = results["video_results"][0]["link"]

video_results = video_results.split("=")


video_results = video_results[1]

print(video_results)
