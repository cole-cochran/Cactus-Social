import { gql } from '@apollo/client';

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
            picture_type
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
        picture_type
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
        picture_type
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
        picture_type
        bio
        tech_stack
        date_joined
        friends {
            _id
            username
        }
        friend_requests {
            _id
            username
        }
        sent_friend_requests {
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
        picture_type
        bio
        tech_stack
        date_joined
        friends {
            _id
            username
        }
        friend_requests {
            _id
            username
        }
        sent_friend_requests {
            _id
            username
        }
    }
}
`;

export const UPDATE_PHOTO = gql`
mutation updatePhoto($userId: ID!, $picture: String!, $picture_type: String!) {
    updatePhoto( userId: $userId, picture: $picture, picture_type: $picture_type) {
        _id
        first_name
        last_name
        username
        email
        picture
        picture_type
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
        picture_type
        bio
        tech_stack
        date_joined
    }
}
`;

export const SEND_FRIEND_REQUEST = gql`
mutation sendFriendRequest($userId: ID!, $friend: ID!) {
    sendFriendRequest(userId: $userId, friend: $friend) {
        _id
        first_name
        last_name
        username
        email
        picture
        picture_type
        bio
        tech_stack
        date_joined
        friends {
            _id
            username
        }
        friend_requests {
            _id
            username
        }
        sent_friend_requests {
            _id
            username
        }
    }
}
`

export const DENY_FRIEND_REQUEST = gql`
mutation denyFriendRequest($userId: ID!, $friend: ID!) {
    denyFriendRequest(userId: $userId, friend: $friend) {
        _id
        first_name
        last_name
        username
        email
        picture
        picture_type
        bio
        tech_stack
        date_joined
        friends {
            _id
            username
        }
        friend_requests {
            _id
            username
        }
        sent_friend_requests {
            _id
            username
        }
    }
}
`

//*  THREAD STUFF

export const CREATE_THREAD = gql`
mutation createThread($moderator: ID!, $private: Boolean!, $title: String!) {
    createThread(moderator: $moderator, private: $private, title: $title) {
        _id
        title
        private
        moderator {
            _id
        }
        date_created
    }
}
`;

export const LEAVE_THREAD = gql`
mutation leaveThread($userId: ID!, $threadId: ID!) {
    leaveThread(userId: $userId, threadId: $threadId) {
        _id
        first_name
        last_name
        username
        picture
        picture_type
        bio
        tech_stack
        date_joined
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
        picture_type
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
        post_text
        date_created
        author {
            _id
            username
            picture
            picture_type
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
        private
        moderator {
            _id
            username
            picture
            picture_type
        }
        members {
            _id
            username
            picture
            picture_type
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
        private
        moderator {
            _id
            username
            picture
            picture_type
        }
        members {
            _id
            username
            picture
            picture_type
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
        private
        moderator {
            _id
            username
            picture
            picture_type
        }
        members {
            _id
            username
            picture
            picture_type
        }
        date_created
    }
}
`;

export const REMOVE_POST_REACTION = gql`
mutation removePostReaction($threadId: ID!, $postId: ID!, $reaction: String!) {
    removePostReaction(threadId: $threadId, postId: $postId, reaction: $reaction) {
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
        private
        moderator {
            _id
            username
            picture
            picture_type
        }
        members {
            _id
            username
            picture
            picture_type
        }
        date_created
    }
}
`

export const CREATE_POST_COMMENT = gql`
mutation createPostComment($postId: ID!, $comment_text: String!, $author: ID!) {
    createPostComment(postId: $postId, comment_text: $comment_text, author: $author) {
        _id
        comment_text
        date_created
        author {
			_id
			username
			picture
            picture_type
		}
        reactions
        edited
        post {
			_id
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
            picture_type
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
            picture_type
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
            picture_type
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

export const REMOVE_POST_COMMENT_REACTION = gql`
mutation removePostCommentReaction($commentId: ID!, $postId: ID!, $reaction: String!) {
    removePostCommentReaction(commentId: $commentId, postId: $postId, reaction: $reaction) {
        _id
        post_text
        date_created
        author {
            _id
            username
            picture
            picture_type
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
mutation createEvent($title: String!, $description: String!, $start_date: String!, $end_date: String!, $start_time: String!, $end_time: String!, $private: Boolean!, $category: String!, $in_person: Boolean!, $location: String!, $image: String!, $image_type: String!, $owner: ID!) {
    createEvent(title: $title, description: $description, start_date: $start_date, end_date: $end_date, start_time: $start_time, end_time: $end_time, private: $private, category: $category, in_person: $in_person, location: $location, image: $image, image_type: $image_type, owner: $owner) {
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
            picture_type
        }
        private
        category
        in_person
        location
        image
        image_type
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
        picture_type
        bio
        tech_stack
        date_joined
    }
}
`;

export const UPDATE_EVENT = gql`
mutation updateEvent($eventId: ID!, $title: String!, $description: String!, $start_date: String!, $end_date: String!, $start_time: String!, $private: Boolean!, $end_time: String!, $category: String!, $in_person: Boolean!, $location: String!, $image: String!, $image_type: String!) {
    updateEvent(eventId: $eventId, title: $title, description: $description, start_date: $start_date, end_date: $end_date, start_time: $start_time, private: $private, end_time: $end_time, category: $category, in_person: $in_person, location: $location, image: $image, image_type: $image_type) {
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
            picture_type
        }
        attendees {
            _id
            username
            picture
            picture_type
        }
        category
        private
        in_person
        location
        image
        image_type
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
            picture_type
        }
        attendees {
            _id
            username
            picture
            picture_type
        }
        category
        in_person
        location
        private
        image
        image_type
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
            picture_type
        }
        attendees {
            _id
            username
            picture
            picture_type
        }
        category
        private
        in_person
        location
        image
        image_type
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
        comment_text
        date_created
        author {
			_id
			username
		}
        reactions
        edited
        post {
			_id
		}
        event {
			_id
		}
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
            picture_type
        }
        attendees {
            _id
            username
            picture
            picture_type
        }
        category
        private
        in_person
        location
        image
        image_type
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
            picture_type
        }
        attendees {
            _id
            username
            picture
            picture_type
        }
        category
        private
        in_person
        location
        image
        image_type
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
            picture_type
        }
        attendees {
            _id
            username
            picture
            picture_type
        }
        category
        private
        in_person
        location
        image
        image_type
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

export const REMOVE_EVENT_COMMENT_REACTION = gql`
mutation removeEventCommentReaction($commentId: ID!, $eventId: ID!, $reaction: String!) {
    removeEventCommentReaction(commentId: $commentId, eventId: $eventId, reaction: $reaction) {
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
            picture_type
        }
        attendees {
            _id
            username
            picture
            picture_type
        }
        category
        private
        in_person
        location
        image
        image_type
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

export const CREATE_CHAT = gql`
mutation createChat($participants: [ID!]!) {
    createChat(participants: $participants) {
        _id
        users {
            _id
        }
        messages {
            _id
        }
        date_created
    }
}
`;

export const REMOVE_CHAT = gql`
mutation removeChat($chatId: ID!, $userId: ID!) {
    removeChat(chatId: $chatId, userId: $userId) {
        _id
        first_name
        last_name
        username
        chats {
            _id
        }
    }
}
`;

export const CREATE_CHAT_MESSAGE = gql`
mutation createChatMessage($chatId: ID!, $sender:ID!, $message: String!) {
    createChatMessage(chatId: $chatId, sender: $sender, message: $message) {
        _id
        sender {
            _id
        }
        message
        edited
        chat {
            _id
        }
        date_created
    }
}
`;

export const DELETE_CHAT_MESSAGE = gql`
mutation deleteChatMessage($chatId: ID!, $messageId: ID!) {
    deleteChatMessage(chatId: $chatId, messageId: $messageId) {
        _id
        users {
            _id
        }
        messages {
            _id
            message
        }
        date_created
    }
}
`;

export const UPDATE_CHAT_MESSAGE = gql`
mutation updateChatMessage($chatId: ID!, $messageId: ID!, $message: String!) {
    updateChatMessage(chatId: $chatId, messageId: $messageId, message: $message) {
        _id
        users {
            _id
        }
        messages {
            _id
            message
        }
        date_created
    }
}
`;

export const DELETE_CHAT = gql`
mutation deleteChat($chatId: ID!) {
    deleteChat(chatId: $chatId) {
        _id
        users {
            _id
        }
        messages {
            _id
            message
        }
        date_created
    }
}
`;

export const SEND_EVENT_INVITE = gql`
mutation sendEventInvite($sender: ID!, $receiver: ID!, $eventId: ID!) {
    sendEventInvite(sender: $sender, receiver: $receiver, eventId: $eventId) {
        _id
        first_name
        last_name
        username
        email
        picture
        picture_type
        bio
        sent_invites {
            _id
            user {
            _id
            }
            event {
            _id
            }
            thread {
            _id
            }
            date_created
        }
    }
}
`;

export const SEND_THREAD_INVITE = gql`
mutation sendThreadInvite($sender: ID!, $receiver: ID!, $threadId: ID!) {
    sendThreadInvite(sender: $sender, receiver: $receiver, threadId: $threadId) {
        _id
        first_name
        last_name
        username
        email
        picture
        picture_type
        bio
        sent_invites {
            _id
            user {
            _id
            }
            event {
            _id
            }
            thread {
            _id
            }
            date_created
        }
    }
}
`;

export const ACCEPT_EVENT_INVITE = gql`
mutation acceptEventInvite($userId: ID!, $senderId: ID!, $eventId: ID!) {
    acceptEventInvite(userId: $userId, senderId: $senderId, eventId: $eventId) {
        _id
        title
        start_date
        end_date
        start_time
        end_time
        owner {
            _id
            username
        }
        attendees {
            _id
            username
        }
        category
        in_person
        location
        private
        image
        image_type
        date_created
        edited
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
    }
}
`;

export const ACCEPT_THREAD_INVITE = gql`
mutation acceptThreadInvite($threadId:ID!, $userId:ID!, $senderId: ID!) {
    acceptThreadInvite(userId: $userId, senderId: $senderId, threadId: $threadId) {
        _id
        title
        posts {
            _id
            author {
                _id
            }
            post_text
        }
        private
        moderator {
            _id
            username
        }
        members {
            _id
            username
        }
        date_created
    }
}
`;

export const REJECT_EVENT_INVITE = gql`
mutation rejectEventInvite($userId: ID!, $senderId: ID!, $eventId: ID!) {
    rejectEventInvite(userId: $userId, senderId: $senderId, eventId: $eventId) {
        _id
        first_name
        last_name
        username
        email
        picture
        picture_type
        bio
        received_invites {
            _id
            user {
            _id
            }
            event {
            _id
            }
            thread {
            _id
            }
            date_created
        }
    }
}
`;

export const REJECT_THREAD_INVITE = gql`
mutation rejectThreadInvite($userId: ID!, $senderId: ID!, $threadId: ID!) {
    rejectThreadInvite(userId: $userId, senderId: $senderId, threadId: $threadId) {
        _id
        first_name
        last_name
        username
        email
        picture
        picture_type
        bio
        received_invites {
            _id
            user {
            _id
            }
            event {
            _id
            }
            thread {
            _id
            }
            date_created
        }
    }
}
`;

export const CREATE_PORTFOLIO_PROJECT = gql`
mutation createPortfolioProject($owner: ID!, $title: String!, $description: String!, $image: String!, $image_type: String!, $responsibilities: String!, $techstack: String!, $repo: String!, $demo: String!) {
    createPortfolioProject(owner: $owner, title: $title, description: $description, image: $image, image_type: $image_type, responsibilities: $responsibilities, techstack: $techstack, repo: $repo, demo: $demo) {
        _id
        first_name
        last_name
        username
        portfolio_projects {
            _id
            title
            description
            image
            image_type
            responsibilities
            techstack
            repo
            demo
        }
    }
}
`;

export const UPDATE_PORTFOLIO_PROJECT = gql`
mutation updatePortfolioProject($userId: ID!, $projectId: ID!, $title: String!, $description: String!, $image: String!, $image_type: String!, $responsibilities: String!, $techstack: String!, $repo: String!, $demo: String!) {
    updatePortfolioProject(userId: $userId, projectId: $projectId, title: $title, description: $description, image: $image, image_type: $image_type, responsibilities: $responsibilities, techstack: $techstack, repo: $repo, demo: $demo) {
        _id
        first_name
        last_name
        username
        portfolio_projects {
            _id
            title
            description
            image
            image_type
            responsibilities
            techstack
            repo
            demo
        }
    }
}
`;

export const DELETE_PORTFOLIO_PROJECT = gql`
mutation deletePortfolioProject($projectId: ID!, $userId: ID!) {
    deletePortfolioProject(projectId: $projectId, userId: $userId) {
        _id
        first_name
        last_name
        username
        portfolio_projects {
            _id
            title
            description
            image
            image_type
            responsibilities
            techstack
            repo
            demo
        }
    }
}
`;

export const UPDATE_USER_LINKS = gql`
mutation updateUserLinks($userId: ID!, $linkedin: String!, $github: String!, $portfolio_page: String!) {
    updateUserLinks(userId: $userId, linkedin: $linkedin, github: $github, portfolio_page: $portfolio_page) {
        _id
        first_name
        last_name
        username
        github
        linkedin
        portfolio_page
    }
}
`;
