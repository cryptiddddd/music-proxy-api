# setup

this document talks about how to authorize the service as a user.

> important note: spotify authorization is only required for certain endpoints -- those which require "`userID`" as a parameter.

registration is a simple process that provides the user with a unique ID associated with their spotify account.


## to register and receive a user ID:

1. visit [`/register`](https://music.wormboy-api.workers.dev/register).
    - this will redirect the user to spotify's authentication page.
    - this page displays which data scopes the api will have access to.
2. accept, and the api will register the user's account.
3. the user will be redirected to `/registration-confirmation`.
    - this endpoint sends JSON data.
4. the user's new id will be under nested under `id`, under `data`.

example response:

```json
{
    "status": 200,
    "message": "authorized. see data for your new id.",
    "data": {"id":"your-ID-here"}
}
```

after setup, the user may now use endpoints that retrieve their top tracks/artists, recently played tracks, so on.


## to de-authorize

to de-authorize this api, visit your [spotify account page](https://account.spotify.com/), and visit the "apps" tab. find "wormboy's music api", and hit "remove access".


## quick start code

for an example javascript that requires a user id, [see here](https://github.com/cryptiddddd/javascript-freebies/tree/main/projects/currentartists).
