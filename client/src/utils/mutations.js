import { gql } from '@apollo/client';

//* create variables to save lines of code in the long run
const threadResponse = `
thread {
    _id
    title
    posts {
        _id
        post_text
        date_created
        author
        reactions {}
        edited
        pinned
        thread
        comments {
            comment_text
            date_created
            author
            reactions {}
            edited
            post
        }
    }
    events {
        title
        start_date
        end_date
        start_time
        end_time
        owner
        attendees {
            username
        }
        category
        in_person
        location
        image
        thread
        comments {
            comment_text
            date_created
            author
            reactions {}
            edited
            post
        }
        date_created
        edited
    }
    moderator
    members {
        username
    }
    date_created
}
`

const userResponse = `
user {
    _id
    first_name
    last_name
    username
    email
    picture
    bio
    threads {
        _id
        title
        posts {
            _id
        }
        events {
            _id
        }
        moderator
        members {
            username
        }
        date_created
    }
    events {
        title
        start_date
        end_date
        start_time
        end_time
        owner
        attendees {
            username
        }
        category
        in_person
        location
        image
        thread {
            _id
        }
        date_created
    }
    tech_stack {
        technology
    }
    date_joined
    friends {
        username
    }
}
`

const postResponse = `
post {
    _id
    post_text
    date_created
    author
    reactions {}
    edited
    pinned
    thread
    comments {
        comment_text
        date_created
        author
        reactions {}
        edited
        post
    }
}
`

const eventResponse = `
events {
    title
    start_date
    end_date
    start_time
    end_time
    owner
    attendees {
        username
    }
    category
    in_person
    location
    image
    thread {
        _id
    }
    comments {
        comment_text
        date_created
        author
        reactions {}
        edited
        post
    }
    date_created
    edited
}
`

//*  USER STUFF

export const LOGIN_USER = gql`
mutation loginUser($username: String!, #password: String!) {
    loginUser(username: $username, password: $password) {
        token
        ${userResponse}
    }
}
`;

export const CREATE_USER = gql`
mutation addUser($first_name: String!, $last_name: String!,$username: String!, $email: String!, $password: String!) {
    addUser( first_name: $first_name, last_name: $last_name, username: $username, email: $email, password: $password) {
        token
        user {
            first_name
            last_name
            username
            email
        }
    }
}
`;

export const ADD_TECH = gql`
mutation addTechnology($userId: ID!, $technology: String!) {
    addTechnology( userId: $userId, technology: $technology) {
        ${userResponse}
    }
}
`;

export const REMOVE_TECH = gql`
mutation removeTechnology($userId: ID!, $technology: String!) {
    removeTechnology( userId: $userId, technology: $technology) {
        ${userResponse}
    }
}
`;

export const ADD_FRIEND = gql`
mutation addFriend($userId: ID!, $friend: String!) {
    addFriend( userId: $userId, friend: $friend) {
        ${userResponse}
    }
}
`;

export const REMOVE_FRIEND = gql`
mutation removeFriend($userId: ID!, $friend: String!) {
    removeFriend( userId: $userId, friend: $friend) {
        ${userResponse}
    }
}
`;

export const UPDATE_PHOTO = gql`
mutation updatePhoto($userId: ID!, $picture: String!) {
    updatePhoto( userId: $userId, picture: $picture) {
        ${userResponse}
    }
}
`;

export const UPDATE_BIO = gql`
mutation updateBio($userId: ID!, $bio: String!) {
    updateBio( userId: $userId, bio: $bio) {
        ${userResponse}
    }
}
`;

//*  THREAD STUFF

export const CREATE_THREAD = gql`
mutation createThread($moderator: String!, $title: String!) {
    createThread( moderator: $moderator, title: $title) {
        thread {
            _id
            title
            posts {}
            events {}
            moderator
            members {}
            date_created
            }
        }
    }
}
`;

export const REMOVE_THREAD = gql`
mutation removeThread($threadId: ID!) {
    removeThread(threadId: $threadId) {
        ${userResponse}
    }
}
`;

// * POST STUFF

export const CREATE_POST = gql`
mutation createPost($thread: String!, $post_text: String!) {
    createPost( thread: $thread, post_text: $post_text) {
        ${threadResponse}
    }
}
`;

export const REMOVE_POST = gql`
mutation removePost($thread: String!, $postId: ID!) {
    removePost( thread: $thread, postId: $postId) {
        ${threadResponse}
    }
}
`;

export const UPDATE_POST = gql`
mutation removePost($thread: String!, $postId: ID! $post_text: String!) {
    removePost( thread: $thread, postId: $postId, post_text: $post_text ) {
        ${threadResponse}
    }
}
`;

export const PIN_POST = gql`
mutation pinPost($thread: String!, $postId: ID!, $pinTitle: String!, $pinHash: String!) {
    pinPost(thread: $thread, postId: $postId, pinTitle: $pinTitle, pinHash: $pinHash) {
        ${threadResponse}
    }
}
`;

export const UNPIN_POST = gql`
mutation unpinPost($thread: String!, $postId: ID!) {
    unpinPost(thread: $thread, postId: $postId) {
        ${threadResponse}
    }
}
`;

export const ADD_POST_REACTION = gql`
mutation addPostReaction($thread: String!, $postId: ID!, $reaction: String!) {
    addPostReaction(thread: $thread, postId: $postId) {
        ${threadResponse}
    }
}
`;

export const CREATE_POST_COMMENT = gql`
mutation createPostComment($postId: ID!, $comment_text: String!) {
    createPostComment(postId: $postId, comment_text: $comment_text) {
        ${postResponse}
    }        
}
`;

export const REMOVE_POST_COMMENT = gql`
mutation removePostComment($postId: ID!, $commentId: ID!) {
    removePostComment(postId: $postId, commentId: $commentId) {
        ${postResponse}
    }
}
`;

export const UPDATE_POST_COMMENT = gql`
mutation updatePostComment($postId: ID!, $commentId: ID!, $comment_text: String!) {
    updatePostComment(postId: $postId, commentId: $commentId, comment_text: $comment_text) {
        ${postResponse}
    }
}
`;

export const ADD_POST_COMMENT_REACTION = gql`
mutation addPostCommentReaction($commentId: ID!, $postId: ID!, $reaction: String!) {
    addPostCommentReaction(commentId: $commentId, postId: $postId, reaction: $reaction) {
        ${postResponse}
    }
}
`;

//*  EVENT STUFF

export const CREATE_EVENT = gql`
mutation createEvent($thread: String!, $title: String!, $description: String!, $start_date: String!, $end_date: String!, $start_time: String!, $end_time: String!, $category: String!, $in_person: Boolean!, $location: String!, $image: String!) {
    createEvent(thread: $thread, title: $title, description: $description, start_date: $start_date, end_date: $end_date, start_time: $start_time, end_time: $end_time, category: $category, in_person: $in_person, location: $location, image: $image) {
        ${eventResponse}
    }
}
`;

export const REMOVE_EVENT = gql`
mutation removeEvent($threadId: ID!, $eventId: ID!) {
    removeEvent(threadId: $threadId, eventId: $eventId) {
        ${eventResponse}
    }
}
`;

export const UPDATE_EVENT = gql`
mutation updateEvent($thread: String!, $title: String!, $description: String!, $start_date: String!, $end_date: String!, $start_time: String!, $end_time: String!, $category: String!, $in_person: Boolean!, $location: String!, $image: String!) {
    updateEvent(thread: $thread, title: $title, description: $description, start_date: $start_date, end_date: $end_date, start_time: $start_time, end_time: $end_time, category: $category, in_person: $in_person, location: $location, image: $image) {
        ${eventResponse}
    }
}
`;

export const ATTEND_EVENT = gql`
mutation attendEvent($eventId: ID!, $attendee: String!) {
    attendEvent(eventId: $eventId, attendee: $attendee) {
        ${eventResponse}
    }
}
`;

export const LEAVE_EVENT = gql`
mutation leaveEvent($eventId: ID!, $attendee: String!) {
    leaveEvent(eventId: $eventId, attendee: $attendee) {
        ${eventResponse}
    }
}
`;

export const CREATE_EVENT_COMMENT = gql`
mutation createEventComment($eventId: ID!, $comment_text: String!) {
    createEventComment(eventId: $eventId, comment_text: $comment_text) {
        ${eventResponse}
    }
}
`;

export const REMOVE_EVENT_COMMENT = gql`
mutation removeEventComment($eventId: ID!, $commentId: String!) {
    removeEventComment(eventId: $eventId, commentId: $commentId) {
        ${eventResponse}
    }
}
`;

export const UPDATE_EVENT_COMMENT = gql`
mutation updateEventComment($eventId: ID!, $commentId: ID!, $comment_text: String!) {
    updateEventComment(eventId: $eventId, commentId: $commentId, comment_text: $comment_text) {
        ${eventResponse}
    }
}
`;

export const ADD_EVENT_COMMENT_REACTION = gql`
mutation addEventCommentReaction($commentId: ID!, $eventId: ID!, $reaction: String!) {
    addEventCommentReaction(commentId: $commentId, eventId: $eventId, reaction: $reaction) {
        ${eventResponse}
    }
}
`;
//*  YEP