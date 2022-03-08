import { gql } from '@apollo/client';

//! In the future, this is for internal use only, but we will use this to let users create friend requests with other users in the application
export const ALL_USERS = gql`
	query allUsers {
		allUsers {
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
				title
				posts {
					_id
				}
				private
			}
			events {
				_id
				title
				owner {
					_id
				}
				private
				category
				in_person
			}
			tech_stack
			date_joined
			friends {
				_id
				username
			}
		}
	}
`;

//* This is for internal use only
export const ALL_THREADS = gql`
query allThreads {
	allThreads {
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
			username
		}
		members {
			username
		}
		date_created
	}
}
`;
//* This is for internal use only
// export const ALL_COMMENTS = gql`
// 	query allComments() {
// 		allComments {
// 			_id
// 			comment_text
// 			date_created
// 			author {
// 				_id
// 			}
// 			reactions
// 			edited
// 			post {
// 				_id
// 			}
// 			event {
// 				_id
// 			}
// 		}
// 	}
// `;
//* This is for internal use only
export const ALL_EVENTS = gql`
	query allEvents {
		allEvents {
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
			private
			attendees {
				_id
				username
			}
			category
			in_person
			location
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
//* This is for internal use only
export const ALL_POSTS = gql`
	query allPosts {
		allPosts {
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
//* This is for internal use only
export const ALL_COMMENTS = gql`
query allComments {
	allComments {
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

export const ALL_THREAD_POSTS = gql`
	query allThreadPosts($threadId: ID!) {
		allThreadPosts(threadId: $threadId) {
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

export const ALL_POST_COMMENTS = gql`
query allPostComments($postId: ID!) {
	allPostComments(postId: $postId) {
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

export const USER_PROFILE = gql`
	query userProfile($userId: ID!) {
		userProfile(userId: $userId) {
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
			pinned_posts {
				_id
				pinTitle
				pinHash
				post {
					_id
					post_text
					author {
						_id
						username
					}
					thread {
						_id
						title
					}
					date_created
				}
			}
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
			github
			linkedin
			portfolio_page
		}
	}
`;

export const FRIEND_REQUESTS = gql`
query friendRequests($userId: ID!) {
	friendRequests(userId: $userId) {
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
		friend_requests {
			_id
			username
			picture
			picture_type
		}
	}
}
`

export const SENT_FRIEND_REQUESTS = gql`
query sentFriendRequests($userId: ID!) {
	sentFriendRequests(userId: $userId) {
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
		sent_friend_requests {
			_id
			username
			picture
			picture_type
		}
	}
}
`

export const USER_THREADS = gql`
query userThreads($userId: ID!) {
	userThreads(userId: $userId) {
		_id
		title
		posts {
			_id
			author {
				_id
			}
		}
		moderator {
			_id
			username
			picture
			picture_type
		}
		private
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

export const USER_EVENTS = gql`
	query userEvents($userId: ID!) {
		userEvents(userId: $userId) {
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
			private
			attendees {
				_id
				username
			}
			category
			in_person
			location
			image
			image_type
			date_created
		}
	}
`;

export const ONE_USER = gql`
	query oneUser($username: String!) {
		oneUser(username: $username) {
			_id
			username
		}
	}
`

export const USER_FRIENDS = gql`
	query userFriends($userId: ID!) {
		userFriends(userId: $userId) {
			_id
			friends {
				_id
				username
				picture
				picture_type
			}
		}
	}
`;

export const THREAD_DETAILS = gql`
	query threadDetails($threadId: ID!) {
		threadDetails(threadId: $threadId) {
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

export const PINNED_POSTS = gql`
query pinnedPosts($threadId: ID!) {
	pinnedPosts(threadId: $threadId) {
		_id
		author {
			_id
			username
			picture
			picture_type
		}
		pinTitle
		pinHash
	}
}
`;

export const POST_DETAILS = gql`
	query postDetails($postId: ID!) {
		postDetails(postId: $postId) {
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

export const EVENT_DETAILS = gql`
	query eventDetails($eventId: ID!) {
		eventDetails(eventId: $eventId) {
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
			attendees {
				_id
				username
				picture
				picture_type
			}
			category
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
					username
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

export const CHAT_DETAILS = gql`
query chatDetails($chatId: ID!) {
	chatDetails(chatId: $chatId) {
		_id
		users {
			_id
			username
		}
		messages {
			_id
			message
			sender {
				_id
				username
			}
			edited
			date_created
		}
		date_created
		}
	}
`;

export const SENT_INVITES = gql`
query sentInvites($userId: ID!) {
	sentInvites(userId: $userId) {
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

export const RECEIVED_INVITES = gql`
query receivedInvites($userId: ID!) {
	receivedInvites(userId: $userId) {
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
			username
			}
			event {
			_id
			title
			}
			thread {
			_id
			title
			}
			date_created
		}
	}
}
`;

export const USER_CHATS = gql`
query userChats($userId: ID!) {
	userChats(userId: $userId) {
		_id
		users {
			_id
			username
			picture
			picture_type
		}
		messages {
			_id
		}
		date_created
	}
}
`
//!  USERNAME IS NESTED IN AUTHOR - FIX RESOLVERS TO POPULATE THAT DATA