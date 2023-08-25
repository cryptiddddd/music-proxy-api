/**
 * this file takes care of all spotify requests. fetching data, formatting requests.
 * 
 * i might make a separate file to keep track of authorization. when the program was last authorized, if it needs to authorize again, etc.
 */

import { spotifyApiRequest, spotifyTokenRequest } from "./utils";

// base spotify api uris
const BASE_URI = "https://api.spotify.com/v1/";


// AUTHORIZATION INITIALIZATION //////////////////////

/**
 * authenticates a new user. provides the refresh toekn.
 * @param SPOTIFY_ID spotify app id
 * @param redirectURI url for redirect
 * @return redirects user to authenticate.
 */
function authenticateUser(SPOTIFY_ID: string, redirectURI: string): Response {
    // create url params
    let parameters = new URLSearchParams({
        response_type: 'code',
        client_id: SPOTIFY_ID,
        scope: "user-top-read user-read-recently-played",
        redirect_uri: redirectURI
    });

    // create redirect
    let uri = "https://accounts.spotify.com/authorize?" + parameters;
    return Response.redirect(uri);
}

/**
 * requests access token from spotify immediately after a user has been registered.
 * @param SPOTIFY_ID spotify app id
 * @param SPOTIFY_SECRET spotify app secret
 * @param redirectURI redirect url MUST match that used for registerUser.
 * @param token the user's refresh token.
 * @return returns user's access token.
 */
async function requestAccessToken(SPOTIFY_ID: string, SPOTIFY_SECRET: string, redirectURI: string, token: string) {    
    let response = await spotifyTokenRequest(SPOTIFY_ID, SPOTIFY_SECRET, {grant_type: "authorization_code", code: token, redirect_uri: redirectURI});
    return {accessToken: response.access_token, refreshToken: response.refresh_token};
}


// REFRESH //////////////////////

/**
 * refreshes a user's access token.
 * @param SPOTIFY_ID client id
 * @param SPOTIFY_SECRET client secret
 * @param refreshToken user's refresh token.
 * @returns new access token.
 */
async function refreshAccessToken(SPOTIFY_ID: string, SPOTIFY_SECRET: string, refreshToken: string): Promise<string> {
    let response = await spotifyTokenRequest(SPOTIFY_ID, SPOTIFY_SECRET, {grant_type: "refresh_token", refresh_token: refreshToken});

    return (response.access_token as string);
}


// API FUNCTIONS //////////////////////

async function getPlaylist(accessToken: string, {playlistID, limit}: {playlistID: string, limit: number}) {
    console.log("getting playlist...");

    let parameters = new URLSearchParams({limit: limit.toString()});
    let uri = BASE_URI + `playlists/${playlistID}` + "?" + parameters;

    return await spotifyApiRequest(accessToken, uri);
}

/**
 * gets a user's most recently listened to tracks.
 * @param accessToken user's access token
 * @param limit the limit of how many tracks to fetch. 
 * @returns raw data from spotify.
 */
async function getRecentTracks(accessToken: string, {limit}: {limit: number}): Promise<any> {
    console.log("getting recently played tracks...");

    let parameters = new URLSearchParams({limit: limit.toString()});
    let uri = BASE_URI + "me/player/recently-played" + "?" + parameters;

    return await spotifyApiRequest(accessToken, uri);
}


/**
 * gets top spotify items.
 * @param accessToken the user's access token.
 * @param type expected to be valid: "artists" or "tracks"
 * @param timeRange expected to be valid: "long_term", "medium_term", or "short_term"
 * @param limit expected to be valid: integer in the range 0 - 50
 */
async function getTopTracks(accessToken: string, {type, timeRange, limit}: {type: string, timeRange: string, limit: number}): Promise<any> {
    console.log(`getting top ${type}...`);

    // organize parameters into uri
    let parameters = new URLSearchParams({time_range: timeRange, limit: limit.toString()});
    let uri = BASE_URI + `me/top/${type}` + "?" + parameters;
    
    return await spotifyApiRequest(accessToken, uri);
}



export {
    authenticateUser,
    getPlaylist,
    getRecentTracks,
    getTopTracks,
    refreshAccessToken,
    requestAccessToken
}
