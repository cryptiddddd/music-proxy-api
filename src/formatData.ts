/**
 * this file takes all of spotify's data and cleans it up for both security and convenience.
 */

interface ImageData {
    height: number;
    url: string;
    width: number;
}

interface ArtistData {
    genres: string[]; // list of all their listed genres.
    image: ImageData; // url to their cover image, the largest one. oops!
    name: string;
    spotifyURL: string; // url to the artist's spotify page.
}

/**
 * takes raw artist data and cleans it up to be as expected.
 * @param data raw data from spotify of a single artist.
 * @returns data formatted to the ArtistData interface.
 */
function formatArtist(data: any): ArtistData {
    return {
        genres: data.genres,
        image: data.images[0],
        name: data.name,
        spotifyURL: data.external_urls.spotify
    }
}


interface AlbumData {
    artwork: ImageData; // url to 640px album art
    name: string;
    releaseDate: string; // album's release date
    trackCount: number; // how many tracks total
}

interface TrackData {
    album: AlbumData; // data on the album
    artists: string[]; // list of names of artists
    name: string; // name of the song
    spotifyURL: string; // url to the song
    trackNumber: number; // # on the album 
}

/**
 * takes raw track data and cleans it up.
 * @param data raw data from spotify of a single track
 * @returns data formatted to the TrackData interface.
 */
function formatTrack(data: any): TrackData {
    return {
        album: {
            artwork: data.album.images[0],
            name: data.album.name,
            releaseDate: data.album.release_date,
            trackCount: data.album.total_tracks
        },
        artists: data.artists.map((d: any) => d.name),
        name: data.name,
        spotifyURL: data.external_urls.spotify,
        trackNumber: data.track_number
    };
}


interface PlaylistData {
    description: string;
    items: TrackData[]; // playlist name
    length: number;
    name: string;
    spotifyURL: string;
}


function formatPlaylist(data: any): PlaylistData {
    return {
        description: data.description,
        items: data.tracks.items.map((item: any) => formatTrack(item.track)),
        length: data.tracks.total,
        name: data.name,
        spotifyURL: data.external_urls.spotify
    }
}

export {
    formatArtist,
    formatPlaylist,
    formatTrack
}
