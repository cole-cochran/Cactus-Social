import { gql } from '@apollo/client';

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

export const USER_PROFILE = gql`
	query userProfile($id: ID!) {
		userProfile(userId: $id) {
			_id
			first_name
			last_name
			username
			email
			password
			picture
			bio
			tech_stack
			date_joined
		}
	}
`;

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

export const USER_FRIENDS = gql`
	query userFriends($userId: ID!) {
		userFriends(userId: $userId) {
			_id
			username
			friends {
				_id
				username
			}
		}
	}
`;

export const ALL_POSTS = gql`
	query allPosts {
		allPosts {
			_id
			post_text
			date_created
			author {
				_id
				username
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

export const ALL_COMMENTS = gql`
	query allComments() {
		allComments {
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
			event {
				_id
			}
		}
	}
`;

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

//! FILTER ON THE FRONTEND TO SEE IF THE LOGGED IN USER IS THE MODERATOR OR A MEMBER
export const USER_EVENTS_AND_THREADS = gql`
	query userEventsAndThreads($userId: ID!) {
		userEventsAndThreads(userId: $userId) {
			threads {
				_id
				title
				moderator {
					_id
				}
				members {
					_id
				}
				date_created
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
