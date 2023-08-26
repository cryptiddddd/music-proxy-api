# endpoints

first, a little bit about endpoints:

each endpoint has parameters [required] and queries [not required]. a parameter will be noted in curly braces where they belong in the url. queries may be added to the end of the url as a query string, [like so: /api/endpoint?query_name=quer_value&other_query=other_value]

for more about url query strings, see here.



get `/api/`

base endpoint, all endpoints begin with /api/, however there is nothing here.
responses:

    404: not found.

### spotify endpoints


get `/api/{userID}/top/{type}`

gets your top artists or tracks on spotify. you may include optional queries for further specificity.
parameters:

    userID: your unique user id received upon registration.
    type: tracks or artists only.

queries:

    time_range: short_term, medium_term, or long_term; must match exactly.

    medium_term
    limit: 0 - 50.

    10

responses:

    200: success. see response's "data" field for data.
    400: bad request, in the case of invalid parameter/query value.
    401: bad or invalid user id.

get `/api/{userID}/recently-played`

gets your most recently played tracks from spotify. you may include an optional query to specify how many tracks you'd like.
parameters:

    userID: your unique user id.

queries:

    limit: 0 - 50.

    10

responses:

    200: success. see response's "data" field for data.
    400: bad request, in the case of invalid parameter/query value.
    401: bad or invalid user id.

get `/api/playlist/{playlistID}`

gets data on the given playlist and a limited number of tracks from the playlist.
parameters:

    playlistID: the playlist's id. [how do i get that id?]

queries:

    limit: 0 - 50.

    10

responses:

    200: success. see response's "data" field for data.
    400: bad request, in the case of invalid parameter/query value.
    404: playlist could not be found. bad id or it is privated.
