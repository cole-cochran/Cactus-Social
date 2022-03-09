//*  PSEUDO CODE - TOP LEVEL VIEW

//! -----------------------------------------------------------------------------------------------

//?  USER DASHBOARD/PROFILE


// TODO  -  Check out module 14

//*  For user sign-up, we want to include: 
//*  Username, First Name, Last Name, Email (set up email confirmation functionality), Password (make them enter twice?), CAPTCHA (look into NPM package), github for sure, automatic 2FA (3rd party auth or email), Zip-Code (better than geo-location invasive stuff)

//*  CHECK OUT STACK OVERFLOW FOR MORE FIELDS

//* For Posts and Comments, we create a room that involves using the threadId and the postId respectively and have user subscribe to these rooms by being added to these rooms from other users already in that room. The events would have to be 'send_join_request", "join_request_accepted", "message". For the rooms we will keep posts and comments into separate rooms rather than nested rooms from a performance standpoint and easier to understand. Use the threadId to create the rooms for posts and then postId to create the rooms for comments, by default make user join the thread rooms automatically when navigated to that page(?), then possibly using e.target.id to get the _id on the post to join the room for comments on that post.

//* For friend requests, instead of using websockets just run a query that will refetch every time user navigates to a different page/component rerenders. Users will have a friend request array and a sent friend request array to keep track of who recieved a friend request and who you've already sent one to. Accept and decline button will run a mutation that will pull from both arrays and either add the _id to the friends list or just delete related data

//! -----------------------------------------------------------------------------------------------

//?  USER TIMELINE

//*  We should have a user Dashboard with profile picture, preferences (set that up later), list of connections/friends OR list of groups/thread that they are apart of, can always add public threads later, let user add a banner image as well, let user choose what is public ( might be too much choice? )

//*  Should threads be invite only? (only time will tell)

//*  Timeline could include user's threads, threads they are apart of, button at the top right of the page that pops out a modal of user's upcoming events, make it look like page 2 from the figma design: https://www.figma.com/file/jy9ybXIV6IVMnbxfeqFDNf/Untitled?node-id=4%3A17 

//*  Potentially give user three or four choices for how they want to organize their timeline

//*  Dark mode / light mode theme for user

//*  Threads will be dropdown-like things, with up to 5 pins displayed upon clicking

//*  when pins are clicked, show another level of dropdown functionality (see figma for examples)

//* Add ability for user to include links (linkedIn, GitHub, Twitter) and the ability to display their work and projects with a cool way of importing the preview of the site without needing images or anything to be stored in database

//* Potentially pass down userId into the sidebar to create a more personalized list of events/threads as well as the friends component to show only users friends and connections

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

//*  Make pin modal dynamic to show pin form when unpinned and otherwise the option to remove the thread.

//*  Make pinning respond to click on "pin icon" from MUI instead of div body. 

//* Allow users to unpin from their pinned posts

//* Make a separate option to show more options in a dropdown to do any sort of "alteration" mutation: editing, deleting

//* Allow only thread owners to delete thread

//! ----------------------------------------------------------------------------------------------- 

//?  EVENT CREATOR MODAL 

//*  Start Time, End Time, Date, Title of Event, Event Category (TBD), Virtual/In-Person, Host, Badges (would be a cool addition), Event Description (limit them to a certain amount of characters? 1000?)

// // *  Automatically becomes a pin (tiers for pins), allow host to unpin if they choose

//? EVENT DISPLAY PAGE

//* make this beautiful

//* add functionality for event owner to update, remove, or invite others to the event

//* allow others to attend, leave, comment on events as they please

//* create modal for users to update, delete their own comments

//! ----------------------------------------------------------------------------------------------- 

//* DONE We need a login/sign-up page (also need validation of login for most of our routes) 

//* DONE (eventsPanel) Query the database to get ALL_EVENTS so they can displayed in rows

//* DONE (eventsPanel) use mutation to allow user to create event in pop-out modal with the event form in it.

//* DONE (eventCreation) fix up event creation form and connect functionality

//* DONE (sidebar) enable user to see all the events at their disposal by clicking on the event icon in the sidebar

//* DONE (app) set up a route so that users can view events based on the event id that is identified in the params
