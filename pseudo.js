//*  PSEUDO CODE - TOP LEVEL VIEW

//! -----------------------------------------------------------------------------------------------

//?  USER DASHBOARD/PROFILE

//*  We need a login/sign-up page (also need validation of login for most of our routes) 
// TODO  -  Check out module 14

//*  For user sign-up, we want to include: 
//*  Username, First Name, Last Name, Email (set up email confirmation functionality), Password (make the enter twice?), CAPTCHA (look into NPM package), github for sure, automatic 2FA (3rd party auth or email), Zip-Code (better than geo-location invasive stuff)

//*  CHECK OUT STACK OVERFLOW FOR MORE FIELDS

//! -----------------------------------------------------------------------------------------------

//?  USER TIMELINE

//*  We should have a user Dashboard with profile picture, preferences (set that up later), list of connections/friends OR list of groups/thread that they are apart of, can always add public threads later, let user add a banner image as well, let user choose what is public ( might be too much choice? )

//*  Should threads be invite only? (only time will tell)

//*  Timeline could include user's threads, threads they are apart of, button at the top right of the page that pops out a modal of user's upcoming events, make it look like page 2 from the figma design: https://www.figma.com/file/jy9ybXIV6IVMnbxfeqFDNf/Untitled?node-id=4%3A17 

//*  Potentially give user three or four choices for how they want to organize their timeline

//*  Dark mode / light mode theme for user

//*  Threads will be dropdown-like things, with up to 5 pins displayed upon clicking

//*  when pins are clicked, show another level of dropdown functionality (see figma for examples)

//! ----------------------------------------------------------------------------------------------- 

//?  THREAD PAGE

//*  Expanded view of what they see on the timeline, show up to 10 (max) pins

//*  more like a slack section view (see slack for examples)

//*  special indicators for pinned posts (BOLDER THAN SLACK - more obvious for sure)

//*  have comment box/textarea at the bottom of the page (see Discord and Slack)

//*  ADDING TO THREADS : Hashing / GIF from Discord is awesome, everything else that Slack has is pretty cool too. Let's have both!

//*  Individual thread comment interaction can be decided upon later

//*  Show thread members somewhere (maybe top-right or bottom-right)

//*  add hash option to create event, maybe that pops out a modal

//! ----------------------------------------------------------------------------------------------- 

//?  EVENT CREATOR MODAL  (after hash command is entered)

//*  Start Time, End Time, Date, Title of Event, Event Category (TBD), Virtual/In-Person, Host, Badges (would be a cool addition), Event Description (limit them to a certain amount of characters? 1000?)

//*  Automatically becomes a pin (tiers for pins), allow host to unpin if they choose

//! ----------------------------------------------------------------------------------------------- 

//* DONE (eventsPanel) Query the database to get ALL_EVENTS so they can displayed in rows

//* DONE (eventsPanel) use mutation to allow user to create event in pop-out modal with the event form in it.

