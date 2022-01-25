import { gql } from '@apollo/client';

// create variables to save lines of code in the long run

// const threadResponse = `
// thread {
//     _id
//     title
//     posts {
//         _id
//         post_text
//         date_created
//         author {
//             _id
//         }
//         reactions
//         edited
//         pinned
//         comments {
//             _id
//         }
//     }
//     events {
//         _id
//         title
//         start_date
//         end_date
//         start_time
//         end_time
//         owner {
//             _id
//         }
//         attendees {
//             _id
//         }
//         category
//         in_person
//         location
//         image
//         thread {
//             _id
//         }
//         date_created
//         edited
//         comments {
//             _id
//         }
//     }
//     moderator {
//         _id
//         username
//         picture
//     }
//     members {
//         _id
//         username
//         picture
//     }
//     date_created
// }`;

// const userResponse = `
// user {
//     _id
//     first_name
//     last_name
//     username
//     email
//     picture
//     bio
//     threads {
//         _id
//         title
//         posts {
//             _id
//         }
//         date_created
//     }
//     events {
//         _id
//         title
//         owner {
//             _id
//         }
//         category
//         in_person
//     }
//     tech_stack
//     date_joined
//     friends {
//         _id
//         username
//     }
// }`;

// const postResponse = `
// post {
//     _id
//     post_text
//     date_created
//     author {
//         _id
//         username
//         picture
//     }
//     reactions
//     edited
//     pinned
//     thread {
//         _id
//         title
//     }
//     comments {
//         _id
//         comment_text
//         date_created
//         author {
//             _id
//         }
//         reactions
//         edited
//         post {
//             _id
//         }
//     }
// }`;

// const eventResponse = `
// event {
//     _id
//     title
//     description
//     start_date
//     end_date
//     start_time
//     end_time
//     owner {
//         _id
//         username
//         picture
//     }
//     attendees {
//         _id
//         username
//         picture
//     }
//     category
//     in_person
//     location
//     image
//     thread {
//         _id
//         title
//     }
//     comments {
//         _id
//         comment_text
//         date_created
//         author {
//             _id
//         }
//         reactions
//         edited
//         event {
//             _id
//         }
//     }
//     date_created
//     edited
// }`;

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
            }
            events {
                _id
            }
            tech_stack
            date_joined
            friends {
                _id
            }
        }
    }
}
`;

export const CREATE_USER = gql`
	mutation createUser(
		$first_name: String!
		$last_name: String!
		$username: String!
		$email: String!
		$password: String!
	) {
		createUser(
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
    addTechnology(userId: $userId, technology: $technology) {
        _id
        first_name
        last_name
        username
        email
        picture
        bio
        tech_stack
        date_joined
    }
}
`;

export const REMOVE_TECH = gql`
mutation removeTechnology($userId: ID!, $technology: String!) {
    removeTechnology(userId: $userId, technology: $technology) {
        _id
        first_name
        last_name
        username
        email
        picture
        bio
        tech_stack
        date_joined
    }
}
`;

export const ADD_FRIEND = gql`
mutation addFriend($userId: ID!, $friend: ID!) {
    addFriend( userId: $userId, friend: $friend) {
        _id
        first_name
        last_name
        username
        email
        picture
        bio
        tech_stack
        date_joined
        friends {
            _id
            username
        }
    }
}
`;

export const REMOVE_FRIEND = gql`
mutation removeFriend($userId: ID!, $friend: ID!) {
    removeFriend(userId: $userId, friend: $friend) {
        _id
        first_name
        last_name
        username
        email
        picture
        bio
        tech_stack
        date_joined
        friends {
            _id
            username
        }
    }
}
`;

export const UPDATE_PHOTO = gql`
mutation updatePhoto($userId: ID!, $picture: String!) {
    updatePhoto( userId: $userId, picture: $picture) {
        _id
        first_name
        last_name
        username
        email
        picture
        bio
        tech_stack
        date_joined
    }
}
`;

export const UPDATE_BIO = gql`
mutation updateBio($userId: ID!, $bio: String!) {
    updateBio( userId: $userId, bio: $bio) {
        _id
        first_name
        last_name
        username
        email
        picture
        bio
        tech_stack
        date_joined
    }
}
`;

//*  THREAD STUFF

export const CREATE_THREAD = gql`
mutation createThread($moderator: ID!, $title: String!) {
    createThread(moderator: $moderator, title: $title) {
        _id
        title
        moderator {
            _id
        }
        date_created
    }
}
`;

export const REMOVE_THREAD = gql`
mutation removeThread($threadId: ID!) {
    removeThread(threadId: $threadId) {
        _id
        first_name
        last_name
        username
        email
        picture
        bio
        tech_stack
        date_joined
    }
}
`;

// * POST STUFF

export const CREATE_POST = gql`
mutation createPost($threadId: ID!, $post_text: String!, $author: ID!) {
    createPost( threadId: $threadId, post_text: $post_text, author: $author) {
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
    }
}
`;

export const REMOVE_POST = gql`
mutation removePost($threadId: ID!, $postId: ID!) {
    removePost( threadId: $threadId, postId: $postId) {
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
    }
}
`;

export const UPDATE_POST = gql`
mutation updatePost($threadId: ID!, $postId: ID! $post_text: String!) {
    updatePost(threadId: $threadId, postId: $postId, post_text: $post_text) {
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
    }
}
`;

export const PIN_POST = gql`
mutation updatePinnedPost($userId: ID!, $postId: ID!, $pinTitle: String, $pinHash: String) {
    updatePinnedPost(userId: $userId, postId: $postId, pinTitle: $pinTitle, pinHash: $pinHash) {
        pinned_posts {
            pinHash
            pinTitle
            post {
                _id
            }
        }
    }
}
`

export const UNPIN_POST = gql`
mutation removePinnedPost($userId: ID!, $pinnedId: ID!) {
    removePinnedPost(userId: $userId, pinnedId: $pinnedId) {
        _id
        pinned_posts {
            _id
            pinHash
            pinTitle
            post {
                _id
            }
        }
    }
}
`

export const ADD_POST_REACTION = gql`
mutation addPostReaction($threadId: ID!, $postId: ID!, $reaction: String!) {
    addPostReaction(threadId: $threadId, postId: $postId, reaction: $reaction) {
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
    }
}
`;

export const CREATE_POST_COMMENT = gql`
mutation createPostComment($postId: ID!, $comment_text: String!, $author: ID!) {
    createPostComment(postId: $postId, comment_text: $comment_text, author: $author) {
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
    }
}
`;

export const REMOVE_POST_COMMENT = gql`
mutation removePostComment($postId: ID!, $commentId: ID!) {
    removePostComment(postId: $postId, commentId: $commentId) {
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
    }
}
`;

export const UPDATE_POST_COMMENT = gql`
mutation updatePostComment($postId: ID!, $commentId: ID!, $comment_text: String!) {
    updatePostComment(postId: $postId, commentId: $commentId, comment_text: $comment_text) {
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
    }
}
`;

export const ADD_POST_COMMENT_REACTION = gql`
mutation addPostCommentReaction($commentId: ID!, $postId: ID!, $reaction: String!) {
    addPostCommentReaction(commentId: $commentId, postId: $postId, reaction: $reaction) {
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
    }
}
`;

//*  EVENT STUFF

export const CREATE_EVENT = gql`
mutation createEvent($title: String!, $description: String!, $start_date: String!, $end_date: String!, $start_time: String!, $end_time: String!, $category: String!, $in_person: Boolean!, $location: String!, $image: String!, $owner: ID!) {
    createEvent(title: $title, description: $description, start_date: $start_date, end_date: $end_date, start_time: $start_time, end_time: $end_time, category: $category, in_person: $in_person, location: $location, image: $image, owner: $owner) {
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
        category
        in_person
        location
        image
        date_created
        edited
    }
}
`;

export const REMOVE_EVENT = gql`
mutation removeEvent($eventId: ID!, $userId: ID!) {
    removeEvent(eventId: $eventId, userId: $userId) {
        _id
        first_name
        last_name
        username
        email
        picture
        bio
        tech_stack
        date_joined
    }
}
`;

export const UPDATE_EVENT = gql`
mutation updateEvent($eventId: ID!, $title: String!, $description: String!, $start_date: String!, $end_date: String!, $start_time: String!, $end_time: String!, $category: String!, $in_person: Boolean!, $location: String!, $image: String!) {
    updateEvent(eventId: $eventId, title: $title, description: $description, start_date: $start_date, end_date: $end_date, start_time: $start_time, end_time: $end_time, category: $category, in_person: $in_person, location: $location, image: $image) {
        _id
        title
        description
        start_date
        end_date
        start_time
        end_time
        category
        in_person
        location
        image
        edited
    }
}
`;

export const ATTEND_EVENT = gql`
mutation attendEvent($eventId: ID!, $attendee: ID!) {
    attendEvent(eventId: $eventId, attendee: $attendee) {
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
    }
}
`;

export const LEAVE_EVENT = gql`
mutation leaveEvent($eventId: ID!, $attendee: ID!) {
    leaveEvent(eventId: $eventId, attendee: $attendee) {
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
    }
}
`;

export const CREATE_EVENT_COMMENT = gql`
mutation createEventComment($eventId: ID!, $comment_text: String!, $author: ID!) {
    createEventComment(eventId: $eventId, comment_text: $comment_text, author: $author) {
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
        comments {
            _id
            comment_text
            date_created
            author {
                _id
            }
            reactions
            edited
        }
        date_created
        edited
    }
}
`;

export const REMOVE_EVENT_COMMENT = gql`
mutation removeEventComment($eventId: ID!, $commentId: ID!) {
    removeEventComment(eventId: $eventId, commentId: $commentId) {
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
        comments {
            _id
            comment_text
            date_created
            author {
                _id
            }
            reactions
            edited
        }
        date_created
        edited
    }
}
`;

export const UPDATE_EVENT_COMMENT = gql`
mutation updateEventComment($eventId: ID!, $commentId: ID!, $comment_text: String!) {
    updateEventComment(eventId: $eventId, commentId: $commentId, comment_text: $comment_text) {
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
        comments {
            _id
            comment_text
            date_created
            author {
                _id
            }
            reactions
            edited
        }
        date_created
        edited
    }
}
`;

export const ADD_EVENT_COMMENT_REACTION = gql`
mutation addEventCommentReaction($commentId: ID!, $eventId: ID!, $reaction: String!) {
    addEventCommentReaction(commentId: $commentId, eventId: $eventId, reaction: $reaction) {
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
    }
}
`;


//* OLD PIN_POST MUTATION
// export const PIN_POST = gql`
// mutation pinPost($threadId: ID!, $postId: ID!, $pinTitle: String!, $pinHash: String!) {
//     pinPost(threadId: $threadId, postId: $postId, pinTitle: $pinTitle, pinHash: $pinHash) {
//         _id
//         title
//         posts {
//             _id
//             post_text
//             date_created
//             author {
//                 _id
//             }
//             reactions
//             edited
//             pinned
//             pinHash
//             pinTitle
//             comments {
//                 _id
//             }
//         }
//         moderator {
//             _id
//             username
//             picture
//         }
//         members {
//             _id
//             username
//             picture
//         }
//         date_created
//     }
// }
// `;

//* OLD UNPIN_POST MUTATION
// export const UNPIN_POST = gql`
// mutation unpinPost($threadId: ID!, $postId: ID!) {
//     unpinPost(threadId: $threadId, postId: $postId) {
//         _id
//         title
//         posts {
//             _id
//             post_text
//             date_created
//             author {
//                 _id
//             }
//             reactions
//             edited
//             pinned
//             pinHash
//             pinTitle
//             comments {
//                 _id
//             }
//         }
//         moderator {
//             _id
//             username
//             picture
//         }
//         members {
//             _id
//             username
//             picture
//         }
//         date_created
//     }
// }
// `;