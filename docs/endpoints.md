# Endpoint Reference

This document discusses API endpoints intended to deliver data to the user. This document does not include registration or other non-data endpoints. 


## `/api/`

Within the `/api/` section are the following endpoints, sorted by category:

- [Spotify Endpoints](#spotify-endpoints)
    - `/api/{userID}/top/{type}`
    - `/api/{userID}/recently_played`
    - `/api/playlist/{playlistID}`

Each endpoint has required *parameters*, marked in curly braces.

Most endpoints have *queries* -- optional specifications. Queries follow consistent rules across each category. Queries may be added to the end of the url as a [query string](https://en.wikipedia.org/wiki/Query_string). 


### Spotify Endpoints

+ `/api/{userID}/top/{type}`: Fetch the user's topmost artists or tracks.
+ `/api/{userID}/recently_played`: Fetch the user's most recently played tracks.
+ `/api/playlist/{playlistID}`: Fetch a public playlist.

#### Queries 

Spotify endpoints *may* have the following queries:

1. **`limit`** -- The maximum number of items to retrieve.

    For example, when retrieving a playlist, you may set `limit` to `13` in order to retrieve 13 or less (if the playlist is not long enough) tracks from the playlist.

    The minimum valid value is `0`, the maximum is `50`. If unspecified, the default is `10`.


2. **`time_range`** -- The period of time to gather data on. There are three valid values:

    | Value          | Description                         |
    |----------------|-------------------------------------|
    | `short_term`   | Within the past 4 weeks.
    | `medium_term`  | Within the past 6 months.
    | `long_term`    | Within the past couple years.

    If unspecified, the default is `medium_term`.


#### GET `/api/{userID}/top/{type}`

Gets your top artists or tracks on spotify. 

**Parameters:**
| Name | Valid values   | Description |
|----|:-:|--------|
| `userID` | * | your unique user id received upon registration.
|`type`  | `tracks` or `artists` | which type of item data to receive.

**Available queries:**
- `limit`
- `time_range`

**Responses:**

| Status code    | Success? | Cause     | 
|---------------:|:--------:|-----------|
| 200 | ✔ | Data retrieved successfully.
| 400 | ✖ | Invalid parameter/query.
| 401 | ✖ | Unrecognized user ID.

On success, data is organized like so:
```JSON
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

Where the contents of `items` is an array of [track or artist data](./data-structures.md#artist-data).


#### GET `/api/{userID}/recently-played`

Gets your most recently played tracks from spotify. 


**Parameters:**
| Name     | Valid values   | Description |
|----------|:--------------:|-------------|
| `userID` | *              | Your unique user id received upon registration.

**Available queries:**
- `limit`

**Responses:**

| Status code    | Success? | Cause     | 
|---------------:|:--------:|-----------|
| 200            | ✔        | Data retrieved successfully.
| 400            | ✖        | Invalid query.
| 401            | ✖        | Unrecognized user ID.

On success, data is organized like so:
```JSON
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

Where the contents of `items` is an array of [track data](./data-structures.md#song-data).


#### GET `/api/playlist/{playlistID}`

Gets data on the given *public* playlist and a limited number of tracks from the playlist.

**Parameters:**
| Name         | Valid values | Description |
|--------------|:------------:|-------------|
| `playlistID` | *            | The ID to your desired playlist, which must be public.

> [how to get a spotify playlist ID?](https://clients.caster.fm/knowledgebase/110/How-to-find-Spotify-playlist-ID.html)

**Available queries:**
- `limit`

**Responses:**

| Status code    | Success? | Cause     | 
|---------------:|:--------:|-----------|
| 200            | ✔       | Data retrieved successfully.
| 400            | ✖       | Invalid query.
| 404            | ✖       | Playlist could not be found.

On success, data is organized like so:
```JSON
{
    "status": 200,
    "message": "success",
    "data": ...
}
```

Where the contents of `data` is a [playlist data object](./data-structures.md#playlist-data).


## And more to come...
