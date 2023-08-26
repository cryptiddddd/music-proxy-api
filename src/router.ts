/**
 * this file is resposible for routing requests.
 * 
 * each request will take care of validating parameters and queries. url parameters are required arguments, where queries are optional modifiers.
 */
import { Router } from "itty-router";

import { fetchUserTokens, newDatabaseUser } from "./database";
import { requestAccessToken, authenticateUser, getPlaylist, getRecentTracks, getTopTracks } from "./spotify";
import { refreshProxy } from "./refresh";

import { badRequestResponse, invalidIdResponse, notFoundResponse, unauthorized } from "./errors";
import { formatArtist, formatPlaylist, formatTrack } from "./formatData";
import { jsonResponse, validateNumberArgument, validateStringArgument } from "./utils";


// specifying request properties.
interface TrueRequest extends Request {
	params: any;
	query: any;
}

// expected environment.
interface Env {
	SPOTIFY_ID: string;
	SPOTIFY_SECRET: string;
	MONGO_API_KEY: string;
	MY_ID: string;
}

const router = Router();


// GENERAL //////////////////////
router.get("/", (request: TrueRequest, env: Env, ctx: ExecutionContext) => {
	console.log(request.url);

	return Response.json({
		status: 200,
		message: "welcome to wormboy 3's music proxy api. there is nothing here on this root page! documentation coming soon..."
	});
});

// router.get("/docs", () => {
// 	// redirect to documentation on wormboy3
// 	return Response.redirect("https://wormboy3.neocities.org/docs/music-proxy"); 
// });

router.get("/privacy-policy", () => {
	let body = "wormboy's music api collects no personal information. wormboy does not care about your personal information. there is a database that stores anonymous tokens to access your spotify account, associated only with the date and time of your registration, and the randomized id you receive upon registration confirmation.\n\nthis api will never ask permission or attempt to create or edit spotify account data [playlists, account safety, everything in between]; it is exclusively a means to read data, and will remain that way. that said: use at your own risk, as anyone with your user id can view your recently played tracks, and top artists/tracks.";

	return new Response(body, {headers: {"content-type": "text/plain"}})
});


// USER MANAGEMENT //////////////////////
router.get("/register", async (request: TrueRequest, env: Env, ctx: ExecutionContext) => {
	let redirectURI = request.url.replace("/register", "/callback");
	return authenticateUser(env.SPOTIFY_ID, redirectURI);
});


router.get("/callback", async (request: TrueRequest, env: Env, ctx: ExecutionContext) => {
	// check for success.
	if ("error" in request.query) { return unauthorized(); }

	// successful: use refresh token to fetch access token
	let reRedirectURI = request.url.replace(/\/callback.*/, "/callback"); // get the same redirect
	let tokens = await requestAccessToken(env.SPOTIFY_ID, env.SPOTIFY_SECRET, reRedirectURI, request.query.code);

	// create new user in the database
	let newUserID = await newDatabaseUser(env.MONGO_API_KEY, tokens);
	
	// redirect to another page to hide url shit.
	let redirectURI = request.url.replace(/callback.*/, "registration_confirmation");
	let parameters = new URLSearchParams({id: newUserID});
	return Response.redirect(redirectURI + "?" + parameters, 303);
});

router.get("/registration_confirmation", (request: TrueRequest, env: Env, ctx: ExecutionContext) => {
	// note: this just displays whatever the value "id" is set to.
	return Response.json({
		status: 200,
		message: "authorized. see data for your new id.",
		data: {id: request.query.id}
	});
});


// USER API ENDPOINTS //////////////////////

// TODO: so far all these endpoints follow a similar structure, i need to find a way to make this more efficient because i have a lot of repeated code right now and it makes me wanna chew rocks.

/**
 * get a specific user's top items.
 * required arguments: user id and type.
 * optional queries: `time_range` and `limit`
 */
router.get("/api/:id/top/:type", async (request: TrueRequest, env: Env, ctx: ExecutionContext) => {
	// VALIDATE ARGS
	// validate top type. valid: artists, tracks.
	if (!["artists", "tracks"].includes(request.params.type)) {
		return badRequestResponse("item type must be 'artists' or 'tracks' exactly.");
	}

	// gather queries and use default if needed.
	let timeRange; let limit;

	try {
		timeRange = validateStringArgument(request.query, "time_range", ["short_term", "medium_term", "long_term"], "medium_term");
	} catch (error) {
		return badRequestResponse("`time_range` must be `short_term`, `medium_term`, or `long_term`.")
	}

	try {
		limit = validateNumberArgument(request.query, "limit", 0, 50, 10);
	} catch (error) {
		return badRequestResponse("`limit` must be an integer in the range 0 - 50.");
	}

	// get user key.
	let userTokens;
	try {
		userTokens = await fetchUserTokens(env.MONGO_API_KEY, request.params.id);
	} catch (err) {
		return invalidIdResponse();
	}
	userTokens.id = request.params.id;

	// GET DATA!!
	let rawData = await refreshProxy(
		env, 
		userTokens, 
		getTopTracks, 
		{type: request.params.type, timeRange: timeRange, limit: limit}
	);

	// format and return
	let formatFunc = request.params.type == "artists"? formatArtist : formatTrack;
	
	return jsonResponse({
		status: 200,
		message: "success, see 'data'",
		data: {
			items: rawData.items.map((item: any) => formatFunc(item))
		}
	});
});


/**
 * gets recently played tracks for a user. optional queries are: limit. 0 - 50
 */
router.get("/api/:id/recently_played", async (request: TrueRequest, env: Env, context: ExecutionContext) => {
	// validate args
	let limit;
	try {
		limit = validateNumberArgument(request.query, "limit", 0, 50, 10);
	} catch (error) {
		return badRequestResponse("`limit` must be an integer in the range 0 - 50.");
	}

	// get user key
	let userTokens;
	try {
		userTokens = await fetchUserTokens(env.MONGO_API_KEY, request.params.id);
	} catch (err) {
		return invalidIdResponse();
	}
	userTokens.id = request.params.id;

	// GET DATA!!
	let rawData = await refreshProxy(
		env, 
		userTokens, 
		getRecentTracks, 
		{limit: limit}
	);

	// format the data.
	return jsonResponse({
		status: 200,
		message: "success, see 'data'",
		data: {
			items: rawData.items.map((item: any) => formatTrack(item.track))
		}
	});
});


/**
 * gets a playlist by the id. valid queries are limit, 0 - 50.
 * note: this uses my acct, so no private playlists other than my own will work...... maybe fix this but for now? oh well.
 */
router.get("/api/playlist/:playlistID", async (request: TrueRequest, env: Env, context: ExecutionContext) => {
	let limit;
	try {
		limit = validateNumberArgument(request.query, "limit", 0, 50, 10);
	} catch (error) {
		return badRequestResponse("`limit` must be an integer in the range 0 - 50.");
	}

	// get user key
	let userTokens;
	try {
		userTokens = await fetchUserTokens(env.MONGO_API_KEY, env.MY_ID);
	} catch (err) {
		return invalidIdResponse();
	}
	userTokens.id = env.MY_ID;

	// GET DATA!!
	let rawData;
	try {
		rawData = await refreshProxy(
			env, 
			userTokens, 
			getPlaylist, 
			{playlistID: request.params.playlistID, limit: limit}
			);
	} catch (err) {
		return notFoundResponse("playlist");
	}
	return jsonResponse(formatPlaylist(rawData));
});


// 404 not found -- important this goes last
router.all("*", () => {
	return jsonResponse({
		status: 404,
		message: "invalid page address or request method." // todo: link documentation.
	});
});

// i believe that this exports the router's handler under the name "fetch"?
export default {
	fetch: router.handle,
};
