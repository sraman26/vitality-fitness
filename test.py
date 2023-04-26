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


# new_url = 'https://serpapi.com/search.json?engine=youtube&search_query=star+wars'
# response = requests.get(new_url, headers={'X-Api-Key': 'miZDGjvtBYyv9qSV1dIncw==jjYja7ggStstXS06'})
# if response.status_code == requests.codes.ok:
#     print(response.text)
# else:
#     print("Error:", response.status_code, response.text)


# [
#   {
#     'position_on_page': 2,
#     'title': 'Star Wars: A New Hope',
#     'link': 'https://www.youtube.com/watch?v=yYNSSNJ0z_U',
#     'channel': {
#             'name': 'YouTube Movies & TV',
#             'verified': True
#             },
#     'length': '2:04:44',
#     'description': 'Luke Skywalker begins a journey that will change the galaxy in Star Wars: Episode IV - A New Hope. Nineteen years after the\xa0...',
#     'info': [
#         'Action & adventure � 1977',
#         'Actors: Mark Hamill, Harrison Ford, Carrie Fisher',
#         'Director: George Lucas'
#         ],
#         'extensions': [
#             'PG',
#             '4K',
#             'CC'
#         ],
#         'thumbnail': 'https://i.ytimg.com/vi_webp/yYNSSNJ0z_U/movieposter.webp'
#     },
#     {
#         'position_on_page': 9,
#         'title': 'Rogue One: A Star Wars Story', 'link': 'https://www.youtube.com/watch?v=joldJiP04hk', 'channel': {'name': 'YouTube Movies & TV', 'verified': True}, 'length': '2:13:57', 'description': 'From Lucasfilm comes the first of the Star Wars stand-alone films � Rogue One: A Star Wars Story, an epic adventure. In a time of\xa0...', 'info': ['Action & adventure � 2016', 'Actors: Felicity Jones, Diego Luna, Ben Mendelsohn', 'Director: Gareth Edwards'], 'extensions': ['PG-13', '4K', 'CC'], 'thumbnail': 'https://i.ytimg.com/vi_webp/joldJiP04hk/movieposter.webp'}] Traceback (most recent call last):


# File "c:\Users\mikli\projects\module3-project-gamma\test.py", line 17, in <module>
#     print(movie_results, results, search)

# File "C:\Users\mikli\AppData\Local\Programs\Python\Python310\lib\encodings\cp1252.py", line 19, in encode
#     return codecs.charmap_encode(input,self.errors,encoding_table)[0]
# UnicodeEncodeError: 'charmap' codec can't encode character '\u2728' in position 27039: character maps to <undefined>
