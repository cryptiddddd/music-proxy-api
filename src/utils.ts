/**
 * miscellaneous functions...
 * 
 * current dir:
 *      - validation
 *      - http request shortcuts.
 */

import { Buffer } from 'node:buffer';


// VALIDATION //////////////////////

/**
 * validates a string argument, returning a string.
 * @param queries object of queries.
 * @param field relevant field within the queries.
 * @param validArgs valid arguments.
 * @param defaultArg the default argument to return.
 * @return the chosen argument.
 */
function validateStringArgument(queries: any, field: string, validArgs: string[], defaultArg: string): string {
    if (field in queries) {
		// validate it
		if (validArgs.includes(queries[field])) return queries[field];

        throw { name: "BadRequest" }

	} else return defaultArg;
}


function validateNumberArgument(queries: any, field: string, validMin: number, validMax: number, defaultArg: number): number {
    if (field in queries) {
        let value = Number(queries[field]);

        if (value > validMin && value < validMax) return value;

        throw { name: "BadRequest" }
    } else return defaultArg;
}


// HTTP REQUESTS //////////////////////
/**
 * shortcut method for mongo http requests. authenticates and so on.
 * @param KEY mongo key
 * @param endpoint endpoint name [ie: "add_user"]
 * @param method http request method
 * @param bodyParams body parameters to stringify
 * @returns returns results
 */
async function mongoRequest(KEY: string, endpoint: string, method: string, bodyParams: object): Promise<any> {
    // create request
    let mongoRequest = new Request(
        "https://us-west-2.aws.data.mongodb-api.com/app/data-mudui/endpoint/" + endpoint, 
        {
            method: method,
            headers: {
                apiKey: KEY
            },
            body: JSON.stringify(bodyParams)
        }
    );
    
    return await (await fetch(mongoRequest)).json();
}


/**
 * shortcut for spotify api requests.
 * @param token user's access token.
 * @param uri url for the request, should already be calculated.
 * @param method http request method, default "GET"
 */
async function spotifyApiRequest(token: string, uri: string, method: string = "GET"): Promise<any> {
    let requestData = {
        method: method,
        headers: {
            "Authorization": "Bearer " + token
        }
    };
    console.log("building request..");
    
    // make the request!
    let request = new Request(uri, requestData);

    console.log("fetching");
    // this is where i make the request, test for success, and if it fails, update the access token and all that....
    return await (await fetch(request)).json();
}

/**
 * shortcut method for making an http request to spotify's token endpoint. 
 * his is only used for requesting and refreshing access tokens.
 * @param SPOTIFY_ID client id
 * @param SPOTIFY_SECRET client secret
 * @param bodyParams body parameters
 * @returns response json
 */
async function spotifyTokenRequest(SPOTIFY_ID: string, SPOTIFY_SECRET: string, bodyParams: Record<string, string>): Promise<any> {
    // api token endpoint
    let URI = "https://accounts.spotify.com/api/token";

    // assemble request.
    let requestData = {
        method: "POST", 
        headers: {
            "Authorization": 'Basic ' + Buffer.from(SPOTIFY_ID + ':' + SPOTIFY_SECRET).toString('base64'),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(bodyParams)
    };

    let spotifyRequest = new Request(URI, requestData);

    // return json
    return await (await fetch(spotifyRequest)).json();
}


export {
    mongoRequest,
    spotifyApiRequest,
    spotifyTokenRequest,
    validateNumberArgument,
    validateStringArgument
}
