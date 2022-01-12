const { User, Comment, Post, Thread, Event, PinnedPost } = require('../models/index');
const { signToken } = require('../utils/auth');
const { AuthenticationError, ApolloError } = require('apollo-server-express');

//! ADD ARRAY OF PIN STRINGS TO THREADS MODEL 

const resolvers = {
	Query: {
		//* get all users
		allUsers: async (parent, args, context) => {
			return await User.find({})
				.populate('threads')
				.populate('events')
				.populate('events.owner')
				.populate('friends');
		},

		//* get single user
		userProfile: async (parent, args, context) => {
			//! add user to the context when we create it and refer to the id as "_id"
			// if (context.user) {
			return await User.findOne({ _id: args.userId });
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* get all threads
		allThreads: async (parent, args, context) => {
			return await Thread.find({}).populate('posts').populate('events').populate('members').populate('moderator').populate('pinned_posts');
		},

		allThreadPosts: async (parent, args, context) => {
			const { threadId } = args;
			return await Post.find({thread: threadId}).populate("author").populate("thread").populate("comments");
		},

		allPostComments: async (parent, args, context) => {
			const { postId } = args;
			const postComments = await Comment.find({post: postId}).populate('author').populate('post').populate('event');
			return postComments;
		},

		//* get specific thread
		threadDetails: async (parent, args, context) => {
			//! add user context to ensure they are logged in
			// if (context.user) {
			return await Thread.findById(args.threadId)
				.populate('posts')
				.populate('events')
				.populate('members')
				.populate('moderator');
				// .populate({ 
				// 	path: 'posts',
				// 	populate: {
				// 		path: 'author',
				// 		model: 'User'
				// 	} 
				// })
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		oneUser: async (parent, args) => {
			const user = await User.findOne({username: args.username});
			if(!user) {
				return new ApolloError('No user found with that username', '404');
			}
			return user;
		},

		//* find user's friends
		userFriends: async (parent, args, context) => {
			//! add user context to ensure they are logged in and change query in typeDefs
			// if (context.user) {
			return await User.findOne({ _id: args.userId }).populate('friends');
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		allPosts: async (parent, args, context) => {
			return await Post.find({}).populate('author').populate('thread').populate('comments');
		},
		//* Old pinnedPosts
		// pinnedPosts: async (parent, args, context) => {
		// 	const { threadId } = args;
		// 	const thread = await Thread.findOne({ _id: threadId }).populate('pinned_posts');

		// 	const allPins = [];

		// 	for (let pinnedPost of thread.pinned_posts) {
		// 		let post = await Post.findOne({ _id: pinnedPost }).populate('author');
				
		// 		allPins.push(post);
		// 	}

		// 	return allPins;
		// },
		pinnedPosts: async (parent, args, context) => {
			const user = await User.findOne({_id: args.userId}).populate('pinned_posts');
			const pinnedPosts = user.pinned_posts;
			return pinnedPosts;
		},

		allComments: async (parent, args, context) => {
			const comments = await Comment.find({}).populate('author').populate('post').populate('event');
			return comments;
		},

		allEvents: async (parent, args, context) => {
			return await Event.find({}).populate('owner').populate('attendees').populate('thread').populate('comments');
		},

		threadEvents: async (parent, args, context) => {
			const { threadId } = args;
			const allEvents = await Event.find(
				{
					where: {
						thread: threadId
					}
				}
			).populate('owner').populate('attendees').populate('thread').populate('comments');
			
			return allEvents;
		},

		//* get all user threads
		userThreads: async (parent, args, context) => {
			//! add user context to filter results and then go back and change query in typeDefs
			// if (context.user) {
			const userData = await User.findOne({ _id: args.userId }).populate('threads');

			const userThreads = [];

			for (let thread of userData.threads) {
				let threadId = await Thread.findOne({ _id: thread }).populate('posts').populate('events').populate('moderator').populate('members');
				userThreads.push(threadId);
			}

			return userThreads;
			// }
			// throw new AuthenticationError('You need to be logged in to do that!')
		},

		//* get all user events
		userEvents: async (parent, args, context) => {
			//! add user context to filter results and then go back and change query in typeDefs
			// if (context.user) {
			const userData = await User.findOne({ _id: args.userId }).populate('events');

			const userEvents = [];

			for (let event of userData.events) {
				let eventId = await Event.findOne({ _id: event }).populate('owner').populate('attendees').populate('thread');
				userEvents.push(eventId);
			}

			return userEvents;
			// }
			// throw new AuthenticationError('You need to be logged in to do that!')
		},

		//* find details of a single post
		postDetails: async (parent, args, context) => {
			//! add user context to ensure they are logged in
			// if (context.user) {
			return await Post.findById(args.postId).populate('author').populate('thread').populate('comments');
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* find details of a single event
		eventDetails: async (parent, args, context) => {
			//! add user context to ensure they are logged in
			return await Event.findById(args.eventId)
				.populate('owner')
				.populate('attendees')
				.populate('thread')
				.populate('comments');
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

			const correctPassword = await foundUser.comparePassword(password);

			if (!correctPassword) {
				throw new AuthenticationError('Incorrect credentials!');
			}

			const token = signToken(foundUser);
			return { token, foundUser };
		},

		//* create a new user
		createUser: async (parent, args) => {
			try{
				const { first_name, last_name, username, email, password } = args;
				const checkUsername = await User.findOne({ username });
				if(checkUsername) {
					return new ApolloError('Username already taken', 422);
				}
				const newUser = await User.create({ first_name, last_name, username, email, password });
	
				const tokenData = {
					username: newUser.username, 
					email: newUser.email, 
					_id: newUser._id
				}
	
				const token = signToken(tokenData);
				return { token, newUser };
			}
			catch(err) {
				return new ApolloError('Sign-up failed', '400');
			}
		},

		//* add a new technology to user tech stack
		addTechnology: async (parent, args, context) => {
			//! get rid of userId when we can use the context to our advantage
			const { userId, technology } = args;
			//! add user context to authenticate
			// if (context.user._id) {
			const user = await User.findOneAndUpdate(
				// would user context instead here
				{ _id: userId },
				{
					$addToSet: {
						tech_stack: technology
					}
				},
				{ new: true }
			);
			return user;
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//! FIX THIS MO FO ASAP

		//* remove technology from user tech stack
		removeTechnology: async (parent, args, context) => {
			//! get rid of userId when we can use the context to our advantage
			const { userId, technology } = args;
			//! use user context to authenticate
			// if (context.user._id) {
			const user = await User.findOneAndUpdate(
				// use context here instead
				{ _id: userId },
				{
					$pull: {
						tech_stack: technology
					}
				},
				{ new: true }
			);
			return user;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* add a friend to user friends array
		addFriend: async (parent, args, context) => {
			//! get rid of userId when we can use the context to our advantage
			const { userId, friend } = args;
			//! add user context to authenticate and change the mutation in typeDefs
			// if (context.user) {
			const user = await User.findOneAndUpdate(
				// use context here instead
				{ _id: userId },
				{
					$addToSet: {
						friends: friend
					}
				},
				{ new: true }
			).populate('friends');
			return user;
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove friend from user tech stack
		removeFriend: async (parent, args, context) => {
			//! get rid of userId when we can use the context to our advantage
			const { userId, friend } = args;
			//! add user context to authenticate and change the mutation in typeDefs
			// if (context.user) {
			const user = await User.findOneAndUpdate(
				{ _id: userId },
				{
					$pull: {
						friends: friend
					}
				},
				{ new: true }
			).populate('friends');
			return user;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		// updateProfile: async (parent, args, context) => {
		// 	const {userId, picture, bio, techArray} = args;
		// 	const updatedUser = await User.findOneAndUpdate(
		// 		{ _id: userId },
		// 		{
		// 			bio: bio,
		// 			picture: picture,
		// 			tech_stack: techArray
		// 		},
		// 		{ new: true }
		// 	);
		// 	return updatedUser;
		// },

		//* update the user's profile photo
		updatePhoto: async (parent, args, context) => {
			//! get rid of userId when we can use the context to our advantage
			const { userId, picture } = args;
			//! add user context to authenticate
			// if (context.user) {
			const user = await User.findOneAndUpdate({ _id: userId }, { picture: picture }, { new: true });
			// }
			return user;
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* update the user's bio
		updateBio: async (parent, args, context) => {
			//! get rid of userId when we can use the context to our advantage
			const { userId, bio } = args;
			//! add user context to authenticate
			// if (context.user) {
			const user = await User.findOneAndUpdate({ _id: userId }, { bio: bio }, { new: true });
			// }
			return user;
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* create a new thread
		createThread: async (parent, args, context) => {
			//! add user context to authenticate
			// if (context.user) {
			//! get rid of userId when we can user the context to our advantage
			const { title, moderator } = args;
			const newThread = await Thread.create({
				title: title,
				moderator: moderator
			});
			await User.findOneAndUpdate(
				{ _id: moderator },
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

		//! CANT TEST UNTIL CONTEXT IS READY BECAUSE IT RETURNS THE USER WHO REMOVED THE THREAD

		//* remove thread
		removeThread: async (parent, args, context) => {
			const { threadId } = args;
			//! add user context to authenticate
			// if (context.user) {
			const thread = await Thread.findOneAndDelete({ _id: threadId }, { new: true });

			for (let member of thread.members) {
				await User.findOneAndUpdate(
					{_id: member},
					{
						$pull: {
							threads: threadId
						}
					}
				)
			}

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
			return thread;
			// return updatedUser
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* create new thread post
		createPost: async (parent, args, context) => {
			//! add user context to authenticate
			// if (context.user) {
			const { threadId, post_text, author } = args;
			const { _id } = await Post.create(
				{
					thread: threadId,
					post_text: post_text,
					author: context.user._id
				}
			);
			const thread = await Thread.findOneAndUpdate(
				{ _id: threadId },
				{
					$addToSet: {
						posts: _id
					}
				},
				{ new: true }
			).populate('posts').populate('moderator').populate('members');
			return thread;
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove thread post
		removePost: async (parent, args, context) => {
			const { threadId, postId } = args;
			//! add user context to authenticate
			// if (context.user) {
			await Post.findOneAndDelete({ _id: postId }, { new: true });
			const thread = await Thread.findOneAndUpdate(
				{ _id: threadId },
				{
					$pull: {
						posts: postId
					}
				},
				{ new: true }
			).populate('posts').populate('moderator').populate('members');
			return thread
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* update thread post
		updatePost: async (parent, args, context) => {
			const { threadId, postId, post_text } = args;
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

			const thread =  await Thread.findOne({ _id: threadId }).populate('posts').populate('moderator').populate('members');

			return thread;
			// }
			// throw new AuthenticationError('Could not find User!');
		},
		updatePinnedPost: async (parent, args, context) => {
			const {userId, postId, pinTitle, pinHash} = args;
			const pinnedPost = await PinnedPost.create({pinTitle: pinTitle, pinHash: pinHash, post: postId});
			const user = await User.findOneAndUpdate(
				{_id: userId},
				{
					$addToSet: {
						pinnedPosts: pinnedPost._id
					}
				},
				{new: true}
			);
			return user;
		},

		removePinnedPost: async (parent, args, context) => {

		},

		//* give user ability to pin posts
		pinPost: async (parent, args, context) => {
			//! probably need to add user context here as well to make sure they have permission
			// if (context.user) {
			const { threadId, postId, pinTitle, pinHash } = args;
			await Post.findOneAndUpdate(
				{ _id: postId },
				{
					pinTitle: pinTitle,
					pinHash: pinHash,
					pinned: true
				},
				{ new: true }
			);

			const thread = await Thread.findOneAndUpdate(
				{ _id: threadId },
				{ 
					$addToSet: 
						{
							pinned_posts: postId
						} 
				},
				{ new: true }
			).populate('posts').populate('moderator').populate('members');

			return thread;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* give user ability to unpin posts
		unpinPost: async (parent, args, context) => {
			//! probably need to add user context here as well to make sure they have permission
			const { threadId, postId } = args;
			await Post.findOneAndUpdate(
				{ _id: postId },
				{
					pinTitle: '',
					pinHash: '',
					pinned: false
				},
				{ new: true }
			);

			const thread = await Thread.findOneAndUpdate(
				{ _id: threadId },
				{ 
					$pull: 
						{
							pinned_posts: postId
						} 
				},
				{ new: true }
			).populate('posts').populate('moderator').populate('members');

			return thread;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//! PROBABLY HOLD THIS OFF UNTIL LAST BECAUSE REACTIONS NEED TO BE AN OBJECT WITH USERNAME INCLUDED OR THEY COULD JUST BE ANONYMOUS
		//* let users react to a post
		addPostReaction: async (parent, args, context) => {
			const { threadId, postId, reaction } = args;
			await Post.findOneAndUpdate(
				{ _id: postId },
				{
					$addToSet: {
						reactions: reaction
					}
				},
				{ new: true }
			);
			
			const thread = await Thread.findOne({ _id: threadId }).populate('posts').populate('moderator').populate('members');

			return thread;
		},

		//* let users add post comments
		createPostComment: async (parent, args, context) => {
			//! probably need to add user context here as well to make sure they have permission
			const { postId, comment_text, author } = args;
			const { _id } = await Comment.create({
				comment_text: comment_text,
				author: author,
				post: postId
			});

			const thePost = await Post.findOneAndUpdate(
				{ _id: postId },
				{
					$addToSet: {
						comments: _id
					}
				},
				{ new: true }
			).populate('author').populate('thread').populate('comments');

			return thePost;
		},

		//* remove post comment
		removePostComment: async (parent, args, context) => {
			const { commentId, postId } = args;
			//! add user context to authenticate
			// if (context.user) {
			await Comment.findOneAndDelete({ _id: commentId }, { new: true });
			const post = await Post.findOneAndUpdate(
				{ _id: postId },
				{
					$pull: {
						comments: commentId
					}
				},
				{ new: true }
			).populate('author').populate('thread').populate('comments');
			return post;
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

			const post = await Post.findOne({ _id: postId }).populate('author').populate('thread').populate('comments');
			return post;
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
				},
				{ new: true }
			);
			
			const post = await Post.findOne({ _id: postId }).populate('author').populate('thread').populate('comments');

			return post;
		},

		//* create new event
		//* temporary owner until context set and mutations tested
		createEvent: async (parent, args, context) => {
			const {
				threadId,
				title,
				description,
				start_date,
				end_date,
				start_time,
				end_time,
				category,
				in_person,
				location,
				image,
				owner
			} = args;
			//! add user context to authenticate
			// if (context.user) {
			// owner: context.userId
			const newEvent = await Event.create({
				title: title,
				description: description,
				start_date: start_date,
				end_date: end_date,
				start_time: start_time,
				end_time: end_time,
				owner: owner,
				category: category,
				in_person: in_person,
				location: location,
				image: image,
				thread: threadId
			});

			const returnedEvent = await Event.findOne({ _id: newEvent._id }).populate('owner').populate('thread');

			//! use context to get userId and complete this
			// await User.findOneAndUpdate(
			// 	{ _id: context.userId },
			// 	{
			// 		$addToSet: {
			// 			events: newEvent._id
			// 			}
			// 	},
			// 	{ new: true }
			// )

			await Thread.findOneAndUpdate(
				{ _id: threadId },
				{
					$addToSet: {
						events: newEvent._id
					}
				},
				{ new: true }
			);
			return returnedEvent;
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove the event
		removeEvent: async (parent, args, context) => {
			const { eventId, threadId, userId } = args;
			//! add user context to authenticate
			// if (context.user) {
			const event = await Event.findOneAndDelete({ _id: eventId }, { new: true });
			//! use context to get userId and complete this
			await User.findOneAndUpdate(
				// { _id: context.user._id },
				{ _id: userId },
				{
					$pull: {
						events: eventId
						}
				}, 
				{ new: true }
			)

			for (let attendee of event.attendees) {
				await User.findOneAndUpdate(
					// { _id: context.user._id },
					{ _id: attendee },
					{
						$pull: {
							events: eventId
							}
					},
					{ new: true }
				)
			}

			const thread = await Thread.findOneAndUpdate(
				{ _id: threadId },
				{
					$pull: {
						events: eventId
					}
				},
				{ new: true }
			);

			return thread;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* let users update events
		updateEvent: async (parent, args, context) => {
			//! add user context here as well to make sure they have permission
			// if (context.user) {
			const {
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

			const updatedEvent = await Event.findOneAndUpdate(
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
			).populate('owner').populate('attendees').populate('thread').populate('comments');

			return updatedEvent;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* let user attend an event
		attendEvent: async (parent, args, context) => {
			const { eventId, attendee } = args;
			//! add user context to authenticate
			// if (context.user) {
			//! use context to get userId and complete this
			await User.findOneAndUpdate(
				// { _id: context.userId },
				{ _id: attendee },
				{
					$addToSet: {
						events: eventId
					}
				},
				{ new: true }
			)

			const event = await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$addToSet: {
						// attendees: context.user._id
						attendees: attendee
					}
				},
				{ new: true }
			).populate('owner').populate('attendees').populate('thread').populate('comments');

			return event;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* let user leave an event
		leaveEvent: async (parent, args, context) => {
			const { eventId, attendee } = args;
			//! add user context to authenticate
			// if (context.user) {
			await User.findOneAndUpdate(
				// { _id: context.userId },
				{ _id: attendee },
				{
					$pull: {
						events: eventId
					}
				},
				{ new: true }
			)
			
			const event = await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$pull: {
						attendees: attendee
					}
				},
				{ new: true }
			).populate('owner').populate('attendees').populate('thread').populate('comments');

			return event;
			// }
			// throw new AuthenticationError('Could not find User!');
			
		},

		//* let users add post comments
		createEventComment: async (parent, args, context) => {
			//! add user context here as well to make sure they have permission
			// if (context.user) {
			const { eventId, comment_text, author } = args;
			const newComment = await Comment.create({
				event: eventId,
				comment_text: comment_text,
				author: author
				// author: context.user._id
			});
			const commentedEvent = await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$addToSet: {
						comments: newComment._id
					}
				},
				{ new: true }
			).populate('owner').populate('attendees').populate('thread').populate('comments');

			return commentedEvent;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* remove post comment
		removeEventComment: async (parent, args, context) => {
			const { commentId, eventId } = args;
			//! add user context to authenticate
			// if (context.user) {
			await Comment.findOneAndDelete({ _id: commentId }, { new: true });
			
			const event = await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$pull: {
						comments: commentId
					}
				},
				{ new: true }
			).populate('owner').populate('attendees').populate('thread').populate('comments');

			return event;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* let users update event comments
		updateEventComment: async (parent, args, context) => {
			//! add user context here as well to make sure they have permission
			// if (context.user) {
			const { eventId, comment_text, commentId } = args;
			await Comment.findOneAndUpdate(
				{ _id: commentId },
				{
					comment_text: comment_text,
					edited: true
				},
				{ new: true }
			);

			const event = await Event.findOne({ _id: eventId }).populate('owner').populate('attendees').populate('thread').populate('comments');

			return event;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* let users react to a comment in a post
		addEventCommentReaction: async (parent, args, context) => {
			//! add user context here as well to make sure they have permission
			// if (context.user) {
			const { commentId, eventId, reaction } = args;
			await Comment.findOneAndUpdate(
				{ _id: commentId },
				{
					$addToSet: {
						reactions: reaction
					}
				},
				{ new: true }
			);
			const event = await Event.findOne({ _id: eventId }).populate('owner').populate('attendees').populate('thread').populate('comments');

			return event;
			// }
			// throw new AuthenticationError('Could not find User!');
		}
	}
};

module.exports = resolvers;
