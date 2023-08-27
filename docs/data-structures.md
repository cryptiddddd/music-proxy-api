# data structure reference

- [spotify models](#spotify-data-models)
    - [album data](#album-data)
    - [artist data](#artist-data)
    - [image data](#image-data)
    - [song data](#song-data)
    - [playlist data](#playlist-data)

this api responds with json data, which will follow a steady pattern.

| property name    | data type         | description                       | 
|------------------|-------------------|-----------------------------------|
| `status`         | number            | the http response status code, 200 for success.
| `message`        | string            | a message related to the status.
| `data`           | object            | if successful, the desired data. this is missing on fail.

i advise checking for a 200 status and logging any non-200 status to console for debugging.

> learn more about working with json data [here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON#json_structure).


## spotify data models

the following are the expected structures for data fetched from spotify.

### album data

when receiving data for a track, album data is included.

| property name    | data type         | description                       | 
|------------------|-------------------|-----------------------------------|
| `artwork`        | object            | [image data](#image-data) containing url to the artwork.
| `name`           | string            | album name.
| `releaseDate`    | string            | the album's release date.
| `trackCount`     | number            | total number of tracks on the album.


### artist data

when receiving data for an artist, expect the following fields:

| property name    | data type         | description                       | 
|------------------|-------------------|-----------------------------------|
| `genres`         | string[]          | a list of genres.
| `image`          | object            | image data containing url to the artwork, see here.
| `name`           | string            | the artist's name.
| `spotifyURL`     | string            | link to the artist on spotify.


### image data

albums and artists have data for an image with the following fields:

| property name    | data type         | description                       | 
|------------------|-------------------|-----------------------------------|
| `height`         | number            | image height in pixels.
| `url`            | string            | url to the image.
| `width`          | number            | image width in pixels.


### song data

when receiving data for a track, expect the following fields:

| property name    | data type         | description                       | 
|------------------|-------------------|-----------------------------------|
| `album`          | string            | data on the album, see here.
| `artists`        | string            | a list of names of artists credited.*
| `name`           | string            | the name of the song.
| `spotifyURL`     | string            | url to the song on spotify.
| `trackNumber`    | number            | this song's track number on its album.

> \* please note: these are names only, not complete artist data objects.

### playlist data

when receiving data for a playlist, expect the following fields.

| property name    | data type         | description                       | 
|------------------|-------------------|-----------------------------------|
| `description`    | string            | the playlist's description.
| `items`          | object[]          | a list of [song data](#song-data) for tracks on the playlist.
| `length`         | number            | number of total tracks on the playlist.
| `name`           | string            | the playlist's name.
| `spotifyURL`     | string            | a link to the playlist on spotify.

> because of spotify's limits, only up to 50 tracks may be retrieved from a playlist in one request. in the future, i will have a way to request further tracks easily, but for now, nope.


## more endpoints coming...
