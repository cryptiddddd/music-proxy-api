/**
 * this file holds error responses.
 */

import { jsonResponse } from "./utils";

function badRequestResponse(message: string): object {
    return jsonResponse({
        status: 400,
        message: `bad request. ${message}`
    });
}


function invalidIdResponse(): object {
    return jsonResponse({
        status: 401, // different status code?
        message: "missing id. could not be validated: id was either not provided or could not be found in the database."
    });
}

function notFoundResponse(item: string): object {
    return jsonResponse({
        status: 404,
        message: `${item} could not be found.`
    })
}

function unauthorized(): object {
    return jsonResponse({
        status: 401,
        message: "unauthorized, access denied."
    });
}

export {
    badRequestResponse,
    invalidIdResponse,
    notFoundResponse,
    unauthorized
}
