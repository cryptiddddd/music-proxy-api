/**
 * this file holds error responses.
 */

function badRequestResponse(message: string): object {
    return Response.json({
        status: 400,
        message: `bad request. ${message}`
    });
}


function invalidIdResponse(): object {
    return Response.json({
        status: 401, // different status code?
        message: "missing id. could not be validated: id was either not provided or could not be found in the database."
    });
}

function notFoundResponse(item: string): object {
    return Response.json({
        status: 404,
        message: `${item} could not be found.`
    })
}

function unauthorized(): object {
    return Response.json({
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
