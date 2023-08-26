# documentation directory

this folder documents wormboy's music api: what it is, how to use it, and how it works.

> for endpoints, [see here](./endpoints.md)
> for data structure reference, [see here](./data-structures.md).

- [explanation](#what-is-this)
- [how to use]()
- [setup]()
- [known issues]()
- [code examples]()
- [more links]()


## what is this?

briefly put: this is a site that you, the user, can interface with in order to access data from spotify: your top artists and songs [according to spotify], your most recently played songs [on spotify], and your playlists. you, as a webmaster, may take this data and arrange it as you desire for your webpage.

it's similar to volt.fm, only with less statistics and more customizability!

on static sites, there is no protecting the code that is your site: it is all available for anyone to see. while i cannot change that, i can provide you with cleaned read-only to access your spotify data. again, i cannot stop others from grabbing your id and displaying your data on their page. but! this api exposes no personal or identifying data, and anyone who would do that is probably a loser.

for my privacy policy, click here.

for an example, see my about page.
how do i use it?

wormboy's music api is a RESTful api service. you access data by making http requests to various urls with your specified parameters.

for more information on RESTful apis, click here.

this section contains three subsections: setup, endpoint references, and data references.
setup

important note: spotify authorization is not required to use this api. it is only required to use the top artists/tracks endpoint and the recently played endpoint.

registration should be a simple flow:

1. this page will redirect you to spotify's authentication page. it will display what data scopes the api will access.
2. if you accept, you will be redirected to a registration confirmation message.
3. find your id, and copy-paste it somewhere for safe keeping.

for example:


{
    "status": 200,
    "message": "authorized. see data for your new id.",
    "data": {"id":"your-ID-here-long-jumbled-mess-of-numbers-and-letters"}
}
                    

within this scary line of text, your id is your-ID-here-long-jumbled-mess-of-numbers-and-letters.

that is all for setup, you are now ready to use this api. see here for example code, including a fill-in-the-blank javascript file.

if you ever with to de-authorize this api, visit your spotify account page, find "wormboy's music api", and hit "remove access".

finally, for an example, i will link to the music api example use of my javascript freebies.
known issues

this is a very new thing i'm making, i have a lot of internal points of improvement to work on.

for you, the user, here is what you should know:

please do not register multiple times. this won't cause major issues, but it might be confusing to have multiple id's. i would prefer you don't, but i can't stop you yet.
read more

    example template
    github page
    wormboy homepage

