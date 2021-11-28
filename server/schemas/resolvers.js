const { User, Comment, Post, Thread, Tech, Event } = require('../models/index');

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

		// get all threads
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

		//* find comments belonging to single post
		//! add user context to ensure they are logged in
		postDetails: async (parent, args, context) => {
			return await Post.findById(args.postId).populate('comments').populate('author');
		},

		//* find comments belonging to single event
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
			//! add JWT web tokens and add authentication to utils
			// if (!foundUser) {
			// throw new AuthenticationError('No user with that email address was found!');
			// }
			// const correctPassword = await foundUser.isCorrectPassword(password);
			// if (!correctPassword) {
			// throw new AuthenticationError('Incorrect credentials!');
			// }

			// const token = signToken(foundUser);
			// return { token, foundUser };
		},

		//* create a new user
		createUser: async (parent, args) => {
			const { first_name, last_name, username, email, password } = args;
			const newUser = await User.create({ first_name, last_name, username, email, password });

			// const token = signToken(newUser);
			// return { token, newUser };
		},

		//* add a new technology to user tech stack
		addTechnology: async (parent, args, context) => {
			const { userId, technology } = args;
			//! add user context to authenticate
			// if (context.user) {
			await User.findOneAndUpdate(
				// would user context instead here
				{ _id: userId },
				{
					$addToSet: {
						tech_stack: {
							technology: technology
						}
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove technology from user tech stack
		removeTechnology: async (parent, args, context) => {
			const { userId, technology } = args;
			//! use user context to authenticate
			// if (context.user) {
			return await User.findOneAndUpdate(
				// use context here instead
				{ _id: userId },
				{
					$pull: {
						tech_stack: {
							technology: technology
						}
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* add a friend to user friends array
		addFriend: async (parent, args, context) => {
			const { username, friend } = args;
			//! add user context to authenticate and change the mutation in typeDefs
			// if (context.user) {
			await User.findOneAndUpdate(
				// use context here instead
				{ username: username },
				{
					$addToSet: {
						friends: {
							//! need to clarify how to do this
							username: friend
						}
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove friend from user tech stack
		removeFriend: async (parent, args, context) => {
			const { username, friend } = args;
			//! add user context to authenticate and change the mutation in typeDefs
			// if (context.user) {
			return await User.findOneAndUpdate(
				{ username: username },
				{
					$pull: {
						friends: {
							//! need to clarify how to do this
							username: friend
						}
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* update the user's profile photo
		updatePhoto: async (parent, args, context) => {
			const { userId, picture } = args;
			//! add user context to authenticate
			// if (context.user) {
			await User.findOneAndUpdate({ _id: userId }, { picture: picture }, { new: true });
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* update the user's bio
		updateBio: async (parent, args, context) => {
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
			const { title, moderator } = args;
			const newThread = await Thread.create(
				{
					title: title,
					moderator: moderator
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
			// const userId = "619f163a1d455824cc304ab1";
			//! add user context to authenticate
			// if (context.user) {
			return await Thread.findOneAndDelete({ _id: threadId }, { new: true });
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
						posts: {
							//! need to verify this
							postId: postId
						}
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//! NEED TO ADD SOME SORT OF INDEXER TO THREAD CREATION TO KEEP TRACK OF IT AND USE IT TO UPDATE A POST IN A GIVEN THREAD
		//* update thread post
		// updatePost: async (parent, args, context) => {
		// 	const { thread, postId, post_text } = args;
		// 	// const userId = "619f163a1d455824cc304ab1";
		// 	//! add user context to authenticate
		// 	// if (context.user) {
		//     await Post.findOneAndUpdate(
		//         { _id: postId },
		//         { post_text: post_text },
		//         { new: true }
		//     );
		//     await Thread.populate.
		// 	return await Thread.findOneAndUpdate(
		// 		{ thread: thread },
		//         {
		//             $set: {
		//                 "posts.postId": {
		//                     post_text: post_text
		//                 }
		//             }
		//         },
		//         { new: true }
		// 	);
		// 	// }
		// 	// throw new AuthenticationError('Could not find User!');
		// },

		//* give user ability to pin posts
		pinPost: async (parent, args, context) => {
			//! probably need to add user context here as well to make sure they have permission
			const { postId } = args;
			return await Post.findOneAndUpdate({ _id: postId }, { pinned: true }, { new: true });
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
						comments: {
							commentId: newComment._id
						}
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
						comments: {
							//! need to verify this
							commentId: commentId
						}
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},


		//* create new event
		createEvent: async (parent, args, context) => {
			const { thread, title, description, start_date, end_date, start_time, end_time, category, in_person, location, image } = args;
			//! add user context to authenticate
			// if (context.user) {
			const newEvent = await Event.create(
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
					thread: thread
				}
			)
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
						events: {
							//! need to verify this
							eventId: newEvent._id
						}
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
						events: {
							//! need to verify this
							eventId: eventId
						}
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* let user attend an event
		attendEvent: async (parent, args, context) => {
			const { eventId, attendee } = args;
			//! add user context to authenticate
			// if (context.user) {
			await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$addToSet: {
						attendees: {
							attendee: attendee
						}
					}
				},
				{ new: true }
			);
			// return await User.findOneAndUpdate(
			// 	{ _id: context.userId },
			// 	{
			// 		$addToSet: {
			// 			events: {
			// 				eventId: eventId
			// 			}
			// 		}
			// 	}
			// )
			// }
		},

		//* let user attend an event
		leaveEvent: async (parent, args, context) => {
			const { eventId, attendee } = args;
			//! add user context to authenticate
			// if (context.user) {
			await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$pull: {
						attendees: {
							attendee: attendee
						}
					}
				},
				{ new: true }
			);
			// return await User.findOneAndUpdate(
			// 	{ _id: context.userId },
			// 	{
			// 		$pull: {
			// 			events: {
			// 				eventId: eventId
			// 			}
			// 		}
			// 	}
			// )
			// }
		},

		//* let users add post comments
		createEventComment: async (parent, args, context) => {
			//! probably need to add user context here as well to make sure they have permission
			const { eventId, comment_text } = args;
			const newComment = await Comment.create({
				event: eventId,
				comment_text: comment_text
			});
			return await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$addToSet: {
						comments: {
							commentId: newComment._id
						}
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
						comments: {
							//! need to verify this
							commentId: commentId
						}
					}
				},
				{ new: true }
			);
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		// TODO:  ADD MUTATIONS FOR UPDATING EVENTS, POSTS, AND COMMENTS

		// TODO:  ADD ABILITY TO ADD REACTIONS TO POSTS, EVENT COMMENTS, AND POST COMMENTS
	}
};

module.exports = resolvers;
