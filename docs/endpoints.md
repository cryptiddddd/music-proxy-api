# endpoint reference

this document discusses api endpoints intended to deliver data to the user. this document does not include registration or other [???] endpoints. 


## `/api/`

within the `/api/` section are the following endpoints, sorted by category:

- spotify
    - `/api/{userID}/top/{type}`
    - `/api/{userID}/recently_played`
    - `/api/playlist/{playlistID}`

each endpoint has *required* parameters, marked in curly braces.

most endpoints have queries -- optional specifications. queries may be added to the end of the url as a [query string](https://en.wikipedia.org/wiki/Query_string).


### spotify endpoints

spotify endpoints *may* have the following queries:

1. **`limit`** -- the maximum number of items to retrieve.

    for example, when retrieving a playlist, you may set `limit` to `13` in order to retrieve 13 or less tracks from the playlist.

    the minimum is `0`, the maximum is `50`. if unspecified, the default is `10`.


2. **`time_range`** -- the period of time to gather data on. there are three valid values:

    | value          | description                         |
    |----------------|-------------------------------------|
    | `short_term`   | within the past 4 weeks.
    | `medium_term`  | within the past 6 months.
    | `long_term`    | within the past couple years.

    if unspecified, the default is `medium_term`.


#### GET `/api/{userID}/top/{type}`

gets your top artists or tracks on spotify. 

**parameters:**
| name | valid values   | description |
|----|:-:|--------|
| `userID` | * | your unique user id received upon registration.
|`type`  | `tracks` or `artists` | which type of item data to receive.

**available queries:**
- `limit`
- `time_range`

**responses:**

| status code    | success? | cause     | 
|---------------:|:--------:|-----------|
| 200 | ✔ | data retrieved successfully.
| 400 | ✖ | invalid parameter/query.
| 401 | ✖ | unrecognized user ID.

on success, data is organized like so:
```json
{
    "status": 200,
    "message": "success",
    "data": {
        "items": [
            ...
        ]
    }
}
```

where the contents of `items` is an array of [track or artist data](./data-structures.md#artist-data).


#### GET `/api/{userID}/recently-played`

gets your most recently played tracks from spotify. 


**parameters:**
| name | valid values   | description |
|----|:-:|--------|
| `userID` | * | your unique user id received upon registration.

**available queries:**
- `limit`

**responses:**

| status code    | success? | cause     | 
|---------------:|:--------:|-----------|
| 200 | ✔ | data retrieved successfully.
| 400 | ✖ | invalid query.
| 401 | ✖ | unrecognized user ID.

on success, data is organized like so:
```json
{
    "status": 200,
    "message": "success",
    "data": {
        "items": [
            ...
        ]
    }
}
```

where the contents of `items` is an array of [track data](./data-structures.md#song-data).


#### GET `/api/playlist/{playlistID}`

gets data on the given *public* playlist and a limited number of tracks from the playlist.

**parameters:**
| name | valid values   | description |
|----|:-:|--------|
| `playlistID` | * | the id to your desired playlist, which must be public.

> [how to get a spotify playlist id?](https://clients.caster.fm/knowledgebase/110/How-to-find-Spotify-playlist-ID.html)

**available queries:**
- `limit`

**responses:**

| status code    | success? | cause     | 
|---------------:|:--------:|-----------|
| 200 | ✔ | data retrieved successfully.
| 400 | ✖ | invalid query.
| 404 | ✖ | playlist could not be found.

on success, data is organized like so:
```json
{
    "status": 200,
    "message": "success",
    "data": ...
}
```

where the contents of `data` is a [playlist data object](./data-structures.md#playlist-data).


## and more to come...
