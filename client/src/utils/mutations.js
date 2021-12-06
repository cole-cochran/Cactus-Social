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
        author {
            _id
        }
        reactions
        edited
        pinned
        comments {
            _id
        }
    }
    events {
        _id
        title
        start_date
        end_date
        start_time
        end_time
        owner {
            _id
        }
        attendees {
            _id
        }
        category
        in_person
        location
        image
        thread {
            _id
        }
        date_created
        edited
        comments {
            _id
        }
    }
    moderator {
        _id
        username
        picture
    }
    members {
        _id
        username
        picture
    }
    date_created
}`;

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
        date_created
    }
    events {
        _id
        title
        owner {
            _id
        }
        category
        in_person
    }
    tech_stack
    date_joined
    friends {
        _id
        username
    }
}`;

const postResponse = `
post {
    _id
    post_text
    date_created
    author {
        _id
        username
        picture
    }
    reactions
    edited
    pinned
    thread {
        _id
        title
    }
    comments {
        _id
        comment_text
        date_created
        author {
            _id
        }
        reactions
        edited
        post {
            _id
        }
    }
}`;

const eventResponse = `
event {
    _id
    title
    description
    start_date
    end_date
    start_time
    end_time
    owner {
        _id
        username
        picture
    }
    attendees {
        _id
        username
        picture
    }
    category
    in_person
    location
    image
    thread {
        _id
        title
    }
    comments {
        _id
        comment_text
        date_created
        author {
            _id
        }
        reactions
        edited
        event {
            _id
        }
    }
    date_created
    edited
}`;

// const commentResponse = `
// comment {
//     _id
//     comment_text
//     date_created
//     author {
//         _id
//     }
//     reactions
//     edited
//     post {
//         _id
//     }
//     event {
//         _id
//     }
// }
// `;

//*  USER STUFF

export const LOGIN_USER = gql`
mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
        token
        ${userResponse}
    }
}
`;

export const CREATE_USER = gql`
	mutation addUser(
		$first_name: String!
		$last_name: String!
		$username: String!
		$email: String!
		$password: String!
	) {
		addUser(
			first_name: $first_name
			last_name: $last_name
			username: $username
			email: $email
			password: $password
		) {
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
mutation addFriend($userId: ID!, $friend: ID!) {
    addFriend( userId: $userId, friend: $friend) {
        ${userResponse}
    }
}
`;

export const REMOVE_FRIEND = gql`
mutation removeFriend($userId: ID!, $friend: ID!) {
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
mutation createThread($moderator: ID!, $title: String!) {
    createThread( moderator: $moderator, title: $title) {
        thread {
            _id
            title
            moderator {
                _id
            }
            members {
                _id
            }
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
mutation createPost($threadId: ID!, $post_text: String!) {
    createPost( threadId: $threadId, post_text: $post_text) {
        ${threadResponse}
    }
}
`;

export const REMOVE_POST = gql`
mutation removePost($threadId: ID!, $postId: ID!) {
    removePost( threadId: $threadId, postId: $postId) {
        ${threadResponse}
    }
}
`;

export const UPDATE_POST = gql`
mutation removePost($threadId: ID!, $postId: ID! $post_text: String!) {
    removePost( threadId: $threadId, postId: $postId, post_text: $post_text ) {
        ${threadResponse}
    }
}
`;

export const PIN_POST = gql`
mutation pinPost($threadId: ID!, $postId: ID!, $pinTitle: String!, $pinHash: String!) {
    pinPost(threadId: $threadId, postId: $postId, pinTitle: $pinTitle, pinHash: $pinHash) {
        ${threadResponse}
    }
}
`;

export const UNPIN_POST = gql`
mutation unpinPost($threadId: ID!, $postId: ID!) {
    unpinPost(threadId: $threadId, postId: $postId) {
        ${threadResponse}
    }
}
`;

export const ADD_POST_REACTION = gql`
mutation addPostReaction($threadId: ID!, $postId: ID!, $reaction: String!) {
    addPostReaction(threadId: $threadId, postId: $postId) {
        ${threadResponse}
    }
}
`;

export const CREATE_POST_COMMENT = gql`
mutation createPostComment($postId: ID!, $comment_text: String!, author: ID!) {
    createPostComment(postId: $postId, comment_text: $comment_text, author: $author) {
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
mutation createEvent($threadId: ID!, $title: String!, $description: String!, $start_date: String!, $end_date: String!, $start_time: String!, $end_time: String!, $category: String!, $in_person: Boolean!, $location: String!, $image: String, $owner: ID!) {
    createEvent(threadId: $threadId, title: $title, description: $description, start_date: $start_date, end_date: $end_date, start_time: $start_time, end_time: $end_time, category: $category, in_person: $in_person, location: $location, image: $image, owner: $owner) {
        ${eventResponse}
    }
}
`;

export const REMOVE_EVENT = gql`
mutation removeEvent($threadId: ID!, $eventId: ID!, $userId: ID!) {
    removeEvent(threadId: $threadId, eventId: $eventId, userId: $userId) {
        ${threadResponse}
    }
}
`;

export const UPDATE_EVENT = gql`
mutation updateEvent($title: String!, $description: String!, $start_date: String!, $end_date: String!, $start_time: String!, $end_time: String!, $category: String!, $in_person: Boolean!, $location: String!, $image: String!) {
    updateEvent(title: $title, description: $description, start_date: $start_date, end_date: $end_date, start_time: $start_time, end_time: $end_time, category: $category, in_person: $in_person, location: $location, image: $image) {
        ${eventResponse}
    }
}
`;

export const ATTEND_EVENT = gql`
mutation attendEvent($eventId: ID!, $attendee: ID!) {
    attendEvent(eventId: $eventId, attendee: $attendee) {
        ${eventResponse}
    }
}
`;

export const LEAVE_EVENT = gql`
mutation leaveEvent($eventId: ID!, $attendee: ID!) {
    leaveEvent(eventId: $eventId, attendee: $attendee) {
        ${eventResponse}
    }
}
`;

export const CREATE_EVENT_COMMENT = gql`
mutation createEventComment($eventId: ID!, $comment_text: String!, $author: ID!) {
    createEventComment(eventId: $eventId, comment_text: $comment_text, author: $author) {
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
