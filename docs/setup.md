# Setup

This document talks about how to authorize the service as a user.

Registration is a simple process that provides the user with a unique ID associated with their Spotify account.


## To register and receive a user ID:

1. Visit [`/register`](https://music.wormboy-api.workers.dev/register).
    - This will redirect the user to Spotify's authentication page.
    - This page displays which data scopes the API will have access to.
2. Accept, and the API will register the user's account.
3. The user will be redirected to `/registration-confirmation`.
    - This endpoint sends JSON data.
4. The user's new ID will be under nested under `id`, under `data`.

example response:

```JSON
{
    "status": 200,
    "message": "authorized. see data for your new id.",
    "data": {"id":"your-ID-here"}
}
```

After setup, the user may now use endpoints that retrieve their top tracks/artists, recently played tracks, so on.


## To de-authorize

To revoke this service's access to your account, visit your [Spotify account page](https://account.spotify.com/), and locate the "apps" tab. Find "Wormboy's Music Api", and hit "remove access".


## Quick Start Code

 For ideas and snippets, [see here](./examples.md). For example starter JavaScript, [see here](https://github.com/cryptiddddd/javascript-freebies/tree/main/projects/currentartists).
