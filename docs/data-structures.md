# Data Structure Reference

- [Spotify models](#spotify-data-models)
    - [Album data](#album-data)
    - [Artist data](#artist-data)
    - [Image data](#image-data)
    - [Song data](#song-data)
    - [Playlist data](#playlist-data)

This API responds with JSON data, which will follow a steady structure.

| Property Name    | Data Type         | Description                       | 
|------------------|-------------------|-----------------------------------|
| `status`         | number            | The HTTP response status code, 200 for success.
| `message`        | string            | A message related to the status.
| `data`           | object            | If successful, the desired data. This is missing on fail.

I advise checking for a 200 status and logging any non-200 status to console for debugging.

> Learn more about working with JSON data [here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON#json_structure).


## Spotify Data Models

The following are the expected structures for data fetched from Spotify. Please note that these structures are not defined by Spotify, but rather refined from the data Spotify provides.

### Album Data

When receiving data for a track, album data is included.

| Property Name    | Data Type         | Description                       | 
|------------------|-------------------|-----------------------------------|
| `artwork`        | object            | [Image data](#image-data) containing url to the artwork.
| `name`           | string            | Album name.
| `releaseDate`    | string            | The album's release date.
| `trackCount`     | number            | Total number of tracks on the album.


### Artist Data

When receiving data for an artist, expect the following fields:

| Property Name    | Data Type         | Description                       | 
|------------------|-------------------|-----------------------------------|
| `genres`         | string[]          | A list of genres.
| `image`          | object            | Image data containing url to the artwork, see here.
| `name`           | string            | The artist's name.
| `spotifyURL`     | string            | Link to the artist on spotify.


### Image Data

Albums and artists have data for an image with the following fields:

| Property Name    | Data Type         | Description                       | 
|------------------|-------------------|-----------------------------------|
| `height`         | number            | Image height in pixels.
| `url`            | string            | Url to the image.
| `width`          | number            | Image width in pixels.


### Song Data

When receiving data for a track, expect the following fields:

| Property Name    | Data Type         | Description                       | 
|------------------|-------------------|-----------------------------------|
| `album`          | string            | Data on the album, see here.
| `artists`        | string[]          | A list of names of artists credited.*
| `name`           | string            | The name of the song.
| `spotifyURL`     | string            | Url to the song on spotify.
| `trackNumber`    | number            | This song's track number on its album.

> \* Please note: these are names only, not complete artist data objects.

### Playlist Data

When receiving data for a playlist, expect the following fields.

| Property Name    | Data Type         | Description                       | 
|------------------|-------------------|-----------------------------------|
| `description`    | string            | The playlist's description.
| `items`          | object[]          | A list of [song data](#song-data) for tracks on the playlist.
| `length`         | number            | Number of total tracks on the playlist.
| `name`           | string            | The playlist's name.
| `spotifyURL`     | string            | A link to the playlist on spotify.

> Because of spotify's limits, only up to 50 tracks may be retrieved from a playlist in one request. In the future, I will have a way to request further tracks easily.


## More Endpoints Coming...
