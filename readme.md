# wormboy's music api

> a spotify api intended for use on neocities and other static site hosts.

read-only access to generic song data.

documentation in progress... working on user-friendly docs on wormboy3.

## notes to self

iiii think that my routing is great! i like the organization. i'm gonna add the lyric stuff later. but right now, i have a couple notes:
- i need to be transparent about the flaws here and how i may in fact not be prepared for everything.
- i want a more uniform way of intercepting and handling errors! is there a universal error handler i could come up with??
- all the spotify api calls so far are pretty uniform [validate parameters, grab user access key, call the specific function, and then format the data.]
    - how could i generalize or streamline this process? spotify's parameters tend to be pretty cookie-cutter, there's a consistency to them between name and valid values...
    - is this something that i could redesign to be objet-oriented, now that i understand more about the authentication flow?
