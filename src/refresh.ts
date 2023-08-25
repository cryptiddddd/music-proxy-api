// this file holds the function that will automatically refresh an access token.

import { refreshAccessToken } from "./spotify";
import { updateAccessToken } from "./database";

/**
 * proxy to call a given spotify api function, in order to ensure refreshing tokens on expiration.
 * @param env cf environment.
 * @param userData user's data, include refresh token, access token, and id.
 * @param func function to call.
 * @param args arguments for the function
 * @returns raw data :]
 */
async function refreshProxy(env: any, userData: any, func: Function, args: object): Promise<any> {
    let rawData;
	do {
		rawData = await func(userData.accessToken, args);

		// catch error, refresh tokens, rerun request, update database.... this could be done nicer!
		if ("error" in rawData) {
			if (rawData.error.status == 401) {
				console.log("refreshing access token...");
				userData.accessToken = await refreshAccessToken(env.SPOTIFY_ID, env.SPOTIFY_SECRET, userData.refreshToken);
		
				// update database.
				await updateAccessToken(env.MONGO_API_KEY, userData.id, userData.accessToken);
			} else {
				throw rawData.error;
			}
		}
	} while ("error" in rawData);

    return rawData
}

export { refreshProxy };