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
			bio
			threads {
				_id
				title
				posts {
					_id
				}
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
		pinned_posts {
			_id
			author {
				_id
			}
			pinTitle
			pinHash
		}
		events {
			title
			owner {
				_id
			}
			category
			in_person
		}
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
			attendees {
				_id
				username
			}
			category
			in_person
			location
			image
			thread {
				_id
				title
			}
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
			}
			reactions
			edited
			pinned
			pinHash
			pinTitle
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
			bio
			tech_stack
			date_joined
		}
	}
`;

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
		events {
			_id
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
			attendees {
				_id
				username
			}
			category
			in_person
			location
			image
			thread
			date_created
		}
	}
`;

export const USER_FRIENDS = gql`
	query userFriends($userId: ID!) {
		userFriends(userId: $userId) {
			_id
			friends {
				_id
				username
				picture
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
		}
		pinTitle
		pinHash
	}
}
`;

export const THREAD_EVENTS = gql`
	query threadEvents($threadId: ID!) {
		threadEvents(threadId: $threadId) {
			_id
			title
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
			image
			date_created
			edited
			comments {
				_id
			}
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
			}
			reactions
			edited
			pinned
			pinTitle
			pinHash
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
		}
	}
`;