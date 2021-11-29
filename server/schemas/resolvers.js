const { User, Comment, Post, Thread, Tech, Event } = require('../models/index');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
	Query: {
		//* get all users
		allUsers: async () => {
			return await User.find({}).populate('events').populate('threads').populate('friends');
		},

		//* get single (logged-in) user
		//! add user to the context when we create it and refer to the id as "_id"
		userProfile: async (parent, args, context) => {
			// if (context.user) {
			// return await User.findOne({ _id: context.user._id })
			return await User.findOne({ _id: args.userId }).populate('events').populate('threads').populate('friends');
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* get all threads
		allThreads: async (parent, args, context) => {
			return await Thread.find({}).populate('posts').populate('events').populate('members').populate('moderator');
		},

		//* get all user threads
		//! add user context to filter results and then go back and change query in typeDefs
		userThreads: async (parent, args, context) => {
			return await Thread.findOne({ username: args.username }).populate('members');
		},

		//* get specific thread
		//! add user context to ensure they are logged in
		threadDetails: async (parent, args, context) => {
			return await Thread.findById(args.threadId)
				.populate('posts')
				.populate('events')
				.populate('members')
				.populate('moderator');
		},

		//* find details of a single post
		//! add user context to ensure they are logged in
		postDetails: async (parent, args, context) => {
			return await Post.findById(args.postId).populate('comments').populate('author');
		},

		//* find details of a single event
		//! add user context to ensure they are logged in
		eventDetails: async (parent, args, context) => {
			return await Event.findById(args.eventId).populate('comments').populate('author');
		},

		//* find user's friends
		//! add user context to ensure they are logged in and change query in typeDefs
		userFriends: async (parent, args, context) => {
			return await User.findById(args.username).populate('friends');
		}
	},
	Mutation: {
		//* log the user in
		loginUser: async (parent, args) => {
			const { username, password } = args;

			const foundUser = await User.findOne({ username });

			if (!foundUser) {
				throw new AuthenticationError('Incorrect credentials!');
			}

			const correctPassword = await foundUser.isCorrectPassword(password);

			if (!correctPassword) {
				throw new AuthenticationError('Incorrect credentials!');
			}

			const token = signToken(foundUser);
			return { token, foundUser };
		},

		//* create a new user
		createUser: async (parent, args) => {
			const { first_name, last_name, username, email, password } = args;
			const newUser = await User.create({ first_name, last_name, username, email, password });

			const token = signToken(newUser);
			return { token, newUser };
		},

		//* add a new technology to user tech stack
		addTechnology: async (parent, args, context) => {
			//! get rid of userId when we can use the context to our advantage
			const { userId, technology } = args;
			//! add user context to authenticate
			// if (context.user._id) {
			await User.findOneAndUpdate(
				// would user context instead here
				{ _id: userId },
				{
					$addToSet: {
						tech_stack: technology
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove technology from user tech stack
		removeTechnology: async (parent, args, context) => {
			//! get rid of userId when we can use the context to our advantage
			const { userId, technology } = args;
			//! use user context to authenticate
			// if (context.user._id) {
			return await User.findOneAndUpdate(
				// use context here instead
				{ _id: userId },
				{
					$pull: {
						tech_stack: technology
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* add a friend to user friends array
		addFriend: async (parent, args, context) => {
			//! get rid of userId when we can use the context to our advantage
			const { userId, friend } = args;
			//! add user context to authenticate and change the mutation in typeDefs
			// if (context.user) {
			await User.findOneAndUpdate(
				// use context here instead
				{ _id: userId },
				{
					$addToSet: {
						friends: friend
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove friend from user tech stack
		removeFriend: async (parent, args, context) => {
			//! get rid of userId when we can use the context to our advantage
			const { userId, friend } = args;
			//! add user context to authenticate and change the mutation in typeDefs
			// if (context.user) {
			return await User.findOneAndUpdate(
				{ _id: userId },
				{
					$pull: {
						friends: friend
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* update the user's profile photo
		updatePhoto: async (parent, args, context) => {
			//! get rid of userId when we can use the context to our advantage
			const { userId, picture } = args;
			//! add user context to authenticate
			// if (context.user) {
			await User.findOneAndUpdate({ _id: userId }, { picture: picture }, { new: true });
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* update the user's bio
		updateBio: async (parent, args, context) => {
			//! get rid of userId when we can use the context to our advantage
			const { userId, bio } = args;
			//! add user context to authenticate
			// if (context.user) {
			await User.findOneAndUpdate({ _id: userId }, { bio: bio }, { new: true });
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* create a new thread
		createThread: async (parent, args, context) => {
			//! add user context to authenticate
			// if (context.user) {
			//! get rid of userId when we can user the context to our advantage
			const { title, moderator, userId } = args;
			const newThread = await Thread.create({
				title: title,
				moderator: moderator
			});
			await User.findOneAndUpdate(
				{ _id: userId },
				{
					$addToSet: {
						threads: newThread._id
					}
				},
				{ new: true }
			);
			return newThread;
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove thread
		removeThread: async (parent, args, context) => {
			const { threadId } = args;
			//! add user context to authenticate
			// if (context.user) {
			const thread = await Thread.findOneAndDelete({ _id: threadId }, { new: true });

			//! uncomment when done connecting frontend login and signup pages
			// const updatedUser = await User.findOneAndUpdate(
			// 	{ _id: context.user._id },
			// 	{
			// 		$pull: {
			// 			threads: thread.title
			// 		}
			// 	},
			//	{ new: true }
			// )
			// return updatedUser
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* create new thread post
		createPost: async (parent, args, context) => {
			//! add user context to authenticate
			// if (context.user) {
			const { thread, post_text } = args;
			const newPost = await Post.create(
				{
					thread: thread,
					post_text: post_text
				},
				{ new: true }
			);
			await Thread.findOneAndUpdate(
				{ thread: thread },
				{
					$addToSet: {
						posts: {
							postId: newPost._id
						}
					}
				},
				{ new: true }
			);
			return newPost;
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove thread post
		removePost: async (parent, args, context) => {
			const { thread, postId } = args;
			//! add user context to authenticate
			// if (context.user) {
			await Post.findOneAndDelete({ _id: postId }, { new: true });
			return await Thread.findOneAndUpdate(
				{ thread: thread },
				{
					$pull: {
						posts: postId
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* update thread post
		updatePost: async (parent, args, context) => {
			const { thread, postId, post_text } = args;
			// const userId = "619f163a1d455824cc304ab1";
			//! add user context to authenticate
			// if (context.user) {
			await Post.findOneAndUpdate(
				{ _id: postId },
				{
					post_text: post_text,
					edited: true
				},
				{ new: true }
			);

			return await Thread.findOneAndUpdate(
				{
					title: thread,
					'posts._id': postId
				},
				{
					'posts.post_text': post_text,
					'posts.edited': true
				}
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* give user ability to pin posts
		pinPost: async (parent, args, context) => {
			//! probably need to add user context here as well to make sure they have permission
			const { postId } = args;
			return await Post.findOneAndUpdate(
				{ _id: postId },
				{
					pinTitle: pinTitle,
					pinHash: pinHash,
					pinned: true
				},
				{ new: true }
			);
		},

		//* give user ability to unpin posts
		unpinPost: async (parent, args, context) => {
			//! probably need to add user context here as well to make sure they have permission
			const { postId } = args;
			return await Post.findOneAndUpdate(
				{ _id: postId },
				{
					pinTitle: pinTitle,
					pinHash: pinHash,
					pinned: false
				},
				{ new: true }
			);
		},

		//* let users add post comments
		createPostComment: async (parent, args, context) => {
			//! probably need to add user context here as well to make sure they have permission
			const { postId, comment_text } = args;
			const newComment = await Comment.create({
				post: postId,
				comment_text: comment_text
			});

			return await Post.findOneAndUpdate(
				{ _id: postId },
				{
					$addToSet: {
						comments: newComment._id
					}
				}
			);
		},

		//* remove post comment
		removePostComment: async (parent, args, context) => {
			const { commentId, postId } = args;
			//! add user context to authenticate
			// if (context.user) {
			await Comment.findOneAndDelete({ _id: commentId }, { new: true });
			return await Post.findOneAndUpdate(
				{ _id: postId },
				{
					$pull: {
						comments: commentId
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* let users update post comments
		updatePostComment: async (parent, args, context) => {
			//! add user context here as well to make sure they have permission
			const { postId, comment_text, commentId } = args;
			await Comment.findOneAndUpdate(
				{ _id: commentId },
				{
					comment_text: comment_text,
					edited: true
				},
				{ new: true }
			);

			return await Post.findOneAndUpdate(
				{
					_id: postId,
					'comments._id': commentId
				},
				{
					'comments.comment_text': post_text,
					'comments.edited': true
				}
			);
		},

		//* create new event
		createEvent: async (parent, args, context) => {
			const {
				thread,
				title,
				description,
				start_date,
				end_date,
				start_time,
				end_time,
				category,
				in_person,
				location,
				image
			} = args;
			//! add user context to authenticate
			// if (context.user) {
			const newEvent = await Event.create({
				title: title,
				description: description,
				start_date: start_date,
				end_date: end_date,
				start_time: start_time,
				end_time: end_time,
				category: category,
				in_person: in_person,
				location: location,
				image: image,
				thread: thread
			});
			//! use context to get userId and complete this
			// await User.findOneAndUpdate(
			// 	{ _id: context.userId },
			// 	{
			// 		$addToSet: {
			// 			events: {
			// 				//! need to verify this
			// 				eventId: newEvent._id
			// 			}
			// 		}
			// 	}
			// )
			return await Thread.findOneAndUpdate(
				{ thread: thread },
				{
					$addToSet: {
						events: newEvent._id
					}
				},
				{ new: true }
			);

			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove the event
		removeEvent: async (parent, args, context) => {
			const { eventId, threadId } = args;
			//! add user context to authenticate
			// if (context.user) {
			await Event.findOneAndDelete({ _id: eventId }, { new: true });
			//! use context to get userId and complete this
			// await User.findOneAndUpdate(
			// 	{ _id: context.userId },
			// 	{
			// 		$pull: {
			// 			events: {
			// 				//! need to verify this
			// 				eventId: eventId
			// 			}
			// 		}
			// 	}
			// )
			return await Thread.findOneAndUpdate(
				{ _id: threadId },
				{
					$pull: {
						events: eventId
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* let users update events
		updateEvent: async (parent, args, context) => {
			//! add user context here as well to make sure they have permission
			const {
				thread,
				eventId,
				title,
				description,
				start_date,
				end_date,
				start_time,
				end_time,
				category,
				in_person,
				location,
				image
			} = args;
			await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					title: title,
					description: description,
					start_date: start_date,
					end_date: end_date,
					start_time: start_time,
					end_time: end_time,
					category: category,
					in_person: in_person,
					location: location,
					image: image,
					edited: true
				},
				{ new: true }
			);

			return await Thread.findOneAndUpdate(
				{
					title: thread,
					'events._id': eventId
				},
				{
					'events.title': title,
					'events.description': description,
					'events.start_date': start_date,
					'events.end_date': end_date,
					'events.start_time': start_time,
					'events.end_time': end_time,
					'events.category': category,
					'events.in_person': in_person,
					'events.location': location,
					'events.image': image,
					'events.edited': true
				}
			);
		},

		//* let user attend an event
		attendEvent: async (parent, args, context) => {
			const { eventId, attendee } = args;
			//! add user context to authenticate
			// if (context.user) {
			//! use context to get userId and complete this
			// await User.findOneAndUpdate(
			// 	{ _id: context.userId },
			// 	{
			// 		$addToSet: {
			// 			events: eventId
			// 		}
			// 	}
			// )
			// }
			return await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$addToSet: {
						attendees: attendee
					}
				},
				{ new: true }
			);
		},

		//* let user leave an event
		leaveEvent: async (parent, args, context) => {
			const { eventId, attendee } = args;
			//! add user context to authenticate
			// if (context.user) {
			await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$pull: {
						attendees: attendee
					}
				},
				{ new: true }
			);
			// return await User.findOneAndUpdate(
			// 	{ _id: context.userId },
			// 	{
			// 		$pull: {
			// 			events: eventId
			// 		}
			// 	}
			// )
			// }
		},

		//* let users add post comments
		createEventComment: async (parent, args, context) => {
			//! add user context here as well to make sure they have permission
			const { eventId, comment_text } = args;
			const newComment = await Comment.create({
				event: eventId,
				comment_text: comment_text
			});
			return await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$addToSet: {
						comments: newComment._id
					}
				}
			);
		},

		//* remove post comment
		removeEventComment: async (parent, args, context) => {
			const { commentId, eventId } = args;
			//! add user context to authenticate
			// if (context.user) {
			await Comment.findOneAndDelete({ _id: commentId }, { new: true });
			return await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$pull: {
						comments: commentId
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* let users update event comments
		updateEventComment: async (parent, args, context) => {
			//! add user context here as well to make sure they have permission
			const { eventId, comment_text, commentId } = args;
			await Comment.findOneAndUpdate(
				{ _id: commentId },
				{
					comment_text: comment_text,
					edited: true
				},
				{ new: true }
			);

			return await Event.findOneAndUpdate(
				{
					_id: eventId,
					'comments._id': commentId
				},
				{
					'comments.comment_text': post_text,
					'comments.edited': true
				}
			);
		},

		//* let users react to a post
		addPostReaction: async (parent, args, context) => {
			const { thread, postId, reaction } = args;
			await Post.findOneAndUpdate(
				{ _id: postId },
				{
					$addToSet: {
						reactions: reaction
					}
				}
			);
			return await Thread.findOneAndUpdate(
				{
					title: thread,
					'posts._id': postId
				},
				{
					$addToSet: {
						'posts.reactions': reaction
					}
				}
			);
		},

		//* let users react to a comment in a post
		addPostCommentReaction: async (parent, args, context) => {
			const { commentId, postId, reaction } = args;
			await Comment.findOneAndUpdate(
				{ _id: commentId },
				{
					$addToSet: {
						reactions: reaction
					}
				}
			);
			return await Post.findOneAndUpdate(
				{
					_id: postId,
					'comments._id': commentId
				},
				{
					$addToSet: {
						'comments.reactions': reaction
					}
				}
			);
		},

		//* let users react to a comment in a post
		addEventCommentReaction: async (parent, args, context) => {
			const { commentId, eventId, reaction } = args;
			await Comment.findOneAndUpdate(
				{ _id: commentId },
				{
					$addToSet: {
						reactions: reaction
					}
				}
			);
			return await Event.findOneAndUpdate(
				{
					_id: eventId,
					'comments._id': commentId
				},
				{
					$addToSet: {
						'comments.reactions': reaction
					}
				}
			);
		}
	}
};

module.exports = resolvers;
