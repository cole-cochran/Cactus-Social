const { User, Comment, Post, Thread, Event, PinnedPost, Chat, ChatMessage } = require('../models/index');
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
				.populate('friends')
				.populate('pinned_posts')
				.populate('pinned_posts.post').populate('friend_requests').populate('sent_friend_requests');
		},

		//* get single user
		userProfile: async (parent, args, context) => {
			//! add user to the context when we create it and refer to the id as "_id"
			// if (context.user) {
			return await User.findOne({ _id: args.userId }).populate("pinned_posts").populate("pinned_posts.post")
			.populate({
				path: "pinned_posts",
				model: "PinnedPost",
				populate: {
					path: "post",
					model: "Post",
					populate: {
						path: "thread",
						model: "Thread"
					}
				}
			});
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* get all threads
		allThreads: async (parent, args, context) => {
			return await Thread.find({}).populate('posts').populate('members').populate('moderator');
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
				.populate('members')
				.populate('moderator');
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

		friendRequests: async (parent, args, context) => {
			const {userId} = args;
			const user = await User.findOne({_id: userId}).populate('friend_requests');
			return user;
		},

		sentFriendRequests: async (parent, args, context) => {
			const { userId } = args;
			const user = await User.findOne({_id: userId}).populate('sent_friend_requests');
			return user;
		},

		allPosts: async (parent, args, context) => {
			return await Post.find({}).populate('author').populate('thread').populate('comments');
		},
		pinnedPosts: async (parent, args, context) => {
			const user = await User.findOne({_id: args.userId}).populate('pinned_posts').populate('pinned_posts.post');
			const pinnedPosts = user.pinned_posts;
			return pinnedPosts;
		},

		allComments: async (parent, args, context) => {
			const comments = await Comment.find({}).populate('author').populate('post').populate('event');
			return comments;
		},

		allEvents: async (parent, args, context) => {
			return await Event.find({}).populate('owner').populate('attendees').populate('comments');
		},

		//* get all user threads
		userThreads: async (parent, args, context) => {
			//! add user context to filter results and then go back and change query in typeDefs
			// if (context.user) {
			const userData = await User.findOne({ _id: args.userId }).populate('threads');

			const userThreads = [];

			for (let thread of userData.threads) {
				let threadId = await Thread.findOne({ _id: thread }).populate('posts').populate('moderator').populate('members');
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
				let eventId = await Event.findOne({ _id: event }).populate('owner').populate('attendees');
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
				.populate('comments')
				.populate({
					path: "comments",
					model: "Comment",
					populate: {
						path: "author",
						model: "User"
					}
				});
		},

		chatDetails: async (parent, args, context) => {
			const { chatId } = args;
			const chat = await Chat.findById(chatId)
			.populate("users").populate("messages")
			.populate({
				path: "messages",
				populate: {
					path: "sender",
					model: "User"
				}
			});
			return chat;
		},

		userChats: async (parent, args, context) => {
			const { userId } = args;
			const chats = await Chat.find({
				users: {
					$elemMatch: {
						_id: userId
					}
				}
			}).populate("users").populate("messages");
			return chats;
		},

		sentInvites: async (parent, args, context) => {
			const { userId } = args;
			const user = await User.findById(userId)
			.populate("sent_invites");
			return user;
		},

		receivedInvites: async (parent, args, context) => {
			const { userId } = args;
			const user = await User.findById(userId).populate("received_invites")
			.populate({
				path: "received_invites",
				populate: {
					path: "user",
					model: "User"
				}
			})
			.populate({
				path: "received_invites",
				populate: {
					path: "event",
					model: "Event"
				}
			})
			.populate({
				path: "received_invites",
				populate: {
					path: "thread",
					model: "Thread"
				}
			})
			;
			return user;
		},


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
				// if(password.length < 6 || password.length > 32) {
				// 	return new ApolloError('Password must be at least 6 characters long')
				// }
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
				console.log(Object.keys(err.errors));
				if(err.errors.username) return new ApolloError(`${err.errors.username}`, '400');
				if(err.errors.password) return new ApolloError(`${err.errors.password}`, '400');
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
					},
					$pull: {
						friend_requests: friend
					}
				},
				{ new: true }
			).populate('friends').populate('sent_friend_requests').populate('friend_requests');

			await User.findOneAndUpdate(
				{ _id: friend },
				{
					$addToSet: {
						friends: userId
					},
					$pull: {
						sent_friend_requests: userId
					}
				},
				{new: true}
			);
			return user;
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove friend from friends array
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
			).populate('friends').populate('sent_friend_requests').populate('friend_requests');

			await User.findOneAndUpdate(
				{ _id: friend },
				{
					$pull: {
						friends: userId
					}
				},
				{ new: true }
			);

			return user;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		sendFriendRequest: async (parent, args, context) => {
			const {userId, friend} = args;
			const user = await User.findOneAndUpdate(
				{_id: userId},
				{
					$addToSet: {
						sent_friend_requests: friend
					}
				},
				{new: true}
			).populate('friends').populate('sent_friend_requests').populate('friend_requests');
			
			await User.findOneAndUpdate(
				{_id: friend},
				{
					$addToSet: {
						friend_requests: userId
					}
				},
				{new: true}
			);
			return user;
		},

		denyFriendRequest: async (parent, args, context) => {
			const {userId, friend} = args;
			const user = await User.findOneAndUpdate(
				{_id: userId},
				{
					$pull: {
						friend_requests: friend
					}
				},
				{new: true}
			).populate('friends').populate('sent_friend_requests').populate('friend_requests');

			await User.findOneAndUpdate(
				{_id: friend},
				{
					$pull: {
						sent_friend_requests: userId
					}
				},
				{new: true}
			);
			return user;
		},

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
			try{
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
			}catch(err) {
				if(err.errors.title) return new ApolloError(`${err.errors.title}`, '400');
			}
			
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

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
			try{
				const { threadId, post_text, author } = args;
				console.log(post_text);
				const post = await Post.create(
					{
						thread: threadId,
						post_text: post_text,
						author: author
					}
				);
				const postPopulatedData = await Post.findOne({_id: post._id}).populate('author').populate('thread').populate('comments');
				const thread = await Thread.findOneAndUpdate(
					{ _id: threadId },
					{
						$addToSet: {
							posts: post._id
						}
					},
					{ new: true }
				).populate('posts').populate('moderator').populate('members');
				// console.log(thread);
				return postPopulatedData;
			}catch(err) {
				console.log(err);
				if(err.errors.post_text) return new ApolloError(`${err.errors.post_text}`, '400');
			}
			
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove thread post
		removePost: async (parent, args, context) => {
			const { threadId, postId } = args;
			//! add user context to authenticate
			// if (context.user) {
			await Post.findOneAndDelete({ _id: postId }, { new: true });

			await PinnedPost.deleteMany(
				{ post: postId },
				{ new: true }
			);
			
			const thread = await Thread.findOneAndUpdate(
				{ _id: threadId },
				{
					$pull: {
						posts: postId
					}
				},
				{ new: true }
			).populate('posts').populate('moderator').populate('members');

			return thread;
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

		//* New Pin Post Mutation
		updatePinnedPost: async (parent, args, context) => {
			const {userId, postId, pinTitle, pinHash} = args;
			const pinnedPost = await PinnedPost.create({pinTitle: pinTitle, pinHash: pinHash, post: postId});
			const user = await User.findOneAndUpdate(
				{_id: userId},
				{
					$push: {
						pinned_posts: pinnedPost._id
					}
				},
				{new: true}
			).populate('pinned_posts');
			return user;
		},

		removePinnedPost: async (parent, args, context) => {
			const { userId, pinnedId } = args;
			await PinnedPost.deleteOne({_id: pinnedId});
			const updatedUser = await User.findOneAndUpdate(
				{_id: userId},
				{
					$pull: {
						pinned_posts: pinnedId
					}
				},
				{new: true}
			).populate('pinned_posts');
			return updatedUser;
		},

		//! PROBABLY HOLD THIS OFF UNTIL LAST BECAUSE REACTIONS NEED TO BE AN OBJECT WITH USERNAME INCLUDED OR THEY COULD JUST BE ANONYMOUS
		//* let users react to a post
		
		addPostReaction: async (parent, args, context) => {
			const { threadId, postId, reaction } = args;
			await Post.findOneAndUpdate(
				{ _id: postId },
				{
					$push: {
						reactions: reaction
					}
				},
				{ new: true }
			);
			
			const thread = await Thread.findOne({ _id: threadId }).populate('posts').populate('moderator').populate('members');

			return thread;
		},

		removePostReaction: async (parent, args, context) => {
			const { threadId, postId, reaction } = args;
			await Post.findOneAndUpdate(
				{ _id: postId },
				{
					$pull: {
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

			const comment = await Comment.findOne({_id}).populate('author').populate('post');

			const thePost = await Post.findOneAndUpdate(
				{ _id: postId },
				{
					$addToSet: {
						comments: _id
					}
				},
				{ new: true }
			).populate('author').populate('thread').populate('comments').populate({
				path: "comments",
				model: "Comment",
				populate: {
					path: "author",
					model: "User"
				}
			});

			return comment;
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
					$push: {
						reactions: reaction
					}
				},
				{ new: true }
			);
			
			const post = await Post.findOne({ _id: postId }).populate('author').populate('thread').populate('comments');

			return post;
		},

		removePostCommentReaction: async (parent, args, context) => {
			const { commentId, postId, reaction } = args;
			await Comment.findOneAndUpdate(
				{ _id: commentId },
				{
					$pull: {
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
				image: image
			});

			const returnedEvent = await Event.findOne({ _id: newEvent._id }).populate('owner');

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

			return returnedEvent;
			// }
			// throw new AuthenticationError('You need to be logged in to do that!');
		},

		//* remove the event
		removeEvent: async (parent, args, context) => {
			const { eventId, userId } = args;
			//! add user context to authenticate
			// if (context.user) {
			// const event = await Event.findOne({ _id: eventId });
			//! use context to get userId and complete this
			// const user = await User.findOneAndUpdate(
			// 	// { _id: context.user._id },
			// 	{ _id: userId },
			// 	{
			// 		$pull: {
			// 			events: eventId
			// 			}
			// 	}, 
			// 	{ new: true }
			// )

			// for (let attendee of event.attendees) {
			// 	await User.findOneAndUpdate(
			// 		// { _id: context.user._id },
			// 		{ _id: attendee },
			// 		{
			// 			$pull: {
			// 				events: eventId
			// 				}
			// 		},
			// 		{ new: true }
			// 	)
			// }

			await Event.findOneAndDelete({ _id: eventId });

			const user = await User.findOne({ _id: userId });

			return user;
			
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
			).populate('owner').populate('attendees').populate('comments');

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
			).populate('owner').populate('attendees').populate('comments');

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
			).populate('owner').populate('attendees').populate('comments');

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
			).populate('owner').populate('attendees').populate('comments').populate({
				path: "comments",
				model: "Comment",
				populate: {
					path: "author",
					model: "User"
				}
			});

			const comment = await Comment.findOne({_id: newComment._id}).populate('event').populate('author');

			return comment;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		//* remove post comment
		removeEventComment: async (parent, args, context) => {
			const { commentId, eventId } = args;
			//! add user context to authenticate
			// if (context.user) {
			await Comment.findOneAndDelete({ _id: commentId });
			
			const event = await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$pull: {
						comments: commentId
					}
				},
				{ new: true }
			).populate('owner').populate('attendees').populate('comments').populate({
				path: "comments",
				model: "Comment",
				populate: {
					path: "author",
					model: "User"
				}
			});

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

			const event = await Event.findOne({ _id: eventId }).populate('owner').populate('attendees').populate('comments').populate({
				path: "comments",
				model: "Comment",
				populate: {
					path: "author",
					model: "User"
				}
			});

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
					$push: {
						reactions: reaction
					}
				},
				{ new: true }
			);
			const event = await Event.findOne({ _id: eventId }).populate('owner').populate('attendees').populate('comments');

			return event;
			// }
			// throw new AuthenticationError('Could not find User!');
		},

		removeEventCommentReaction: async (parent, args, context) => {

			const { commentId, eventId, reaction } = args;
			await Comment.findOneAndUpdate(
				{ _id: commentId },
				{
					$pull: {
						reactions: reaction
					}
				},
				{ new: true }
			);
			const event = await Event.findOne({ _id: eventId }).populate('owner').populate('attendees').populate('comments');

			return event;
		},

		createChat: async (parent, args, context) => {
			const { participants } = args;
			const createdChat = await Chat.create({ users: participants });
			const newChat = Chat.findById(createdChat._id).populate("users");
			for (let user of participants) {
				await User.findOneAndUpdate(
					{ _id: user._id },
					{
						$addToSet: {
							chats: newChat._id
						}
					},
					{ new: true }
				).populate("chats");
			};
			return newChat;
		},

		removeChat: async (parent, args, context) => {
			const { chatId, userId } = args;
			const user = await User.findOneAndUpdate(
				{ _id: userId },
				{
					$pull: {
						chats: chatId
					}
				},
				{ new: true }
			).populate("chats");
			await Chat.findOneAndUpdate(
				{ _id: chatId },
				{
					$pull: {
						users: userId
					}
				},
				{ new: true }
			);
			return user;
		},

		deleteChat: async (parent, args, context) => {
			const { chatId } = args;
			await Chat.findOneAndDelete({ _id: chatId }, {new: true});
			const allChats = await Chat.find({}).populate("users").populate("messages");
			return allChats;
		}
		,

		createChatMessage: async (parent, args, context) => {
			const { chatId, sender, message } = args;
			const newMsg = await ChatMessage.create({
				sender: sender,
				message: message,
				chat: chatId
			});
			const updatedChat = await Chat.findOneAndUpdate(
				{ _id: chatId },
				{
					$addToSet: {
						messages: newMsg._id
					}
				},
				{ new: true }
			).populate("messages").populate("users");
			return updatedChat;
		},

		deleteChatMessage: async (parent, args, context) => {
			const { chatId, messageId } = args;
			await ChatMessage.findOneAndDelete({ _id: messageId });
			const updatedChat = await Chat.findOneAndUpdate(
				{ _id: chatId },
				{
					$pull: {
						messages: messageId
					}
				},
				{ new: true }
			).populate("messages").populate("users");
			return updatedChat;
		},

		updateChatMessage: async (parent, args, context) => {
			const { chatId, messageId, message } = args;
			await ChatMessage.findOneAndUpdate(
				{ _id: messageId },
				{
					message: message
				},
				{ new: true }
			);
			const updatedChat = Chat.findById(chatId).populate("messages").populate("users");;
			return updatedChat;
		},

		sendEventInvite: async (parent, args, context) => {
			const { sender, receiver, eventId } = args;
			const sendingUser = await User.findOneAndUpdate(
				{ _id: sender },
				{
					$addToSet: {
						sent_invites: {
							user: receiver,
							event: eventId
						}
					}
				},
				{ new: true }
			).populate("sent_invites");
			await User.findOneAndUpdate(
				{ _id: receiver },
				{
					$addToSet: {
						received_invites: {
							user: sender,
							event: eventId
						}
					}
				},
				{ new: true }
			).populate("received_invites");
			return sendingUser;
		},

		sendThreadInvite: async (parent, args, context) => {
			const { sender, receiver, threadId } = args;
			const sendingUser = await User.findOneAndUpdate(
				{ _id: sender },
				{
					$addToSet: {
						sent_invites: {
							user: receiver,
							thread: threadId
						}
					}
				},
				{ new: true }
			).populate("sent_invites");
			await User.findOneAndUpdate(
				{ _id: receiver },
				{
					$addToSet: {
						received_invites: {
							user: sender,
							thread: threadId
						}
					}
				},
				{ new: true }
			).populate("received_invites");
			return sendingUser;
		},

		acceptEventInvite: async (parent, args, context) => {
			const { userId, senderId, eventId } = args;
			await User.findOneAndUpdate(
				{ _id: userId },
				{
					$pull: {
						received_invites: {
							event: eventId
						}
					}
				},
				{ new: true }
			).populate("received_invites");
			await User.findOneAndUpdate(
				{ _id: senderId },
				{
					$pull: {
						sent_invites: {
							user: userId,
							event: eventId
						}
					}
				},
				{ new: true }
			).populate("sent_invites");
			await User.findOneAndUpdate(
				{ _id: userId },
				{
					$addToSet: {
						events: eventId
					}
				},
				{ new: true }
			).populate("events");
			const updatedEvent = await Event.findOneAndUpdate(
				{ _id: eventId },
				{
					$addToSet: {
						attendees: userId
					}
				},
				{ new: true }
			).populate("attendees").populate("owner").populate("comments");
			return updatedEvent;
		},

		acceptThreadInvite: async (parent, args, context) => {
			const { userId, senderId, threadId } = args;
			await User.findOneAndUpdate(
				{ _id: userId },
				{
					$pull: {
						received_invites: {
							user: userId,
							thread: threadId
						}
					}
				},
				{ new: true }
			).populate("received_invites");
			await User.findOneAndUpdate(
				{ _id: senderId },
				{
					$pull: {
						sent_invites: {
							thread: threadId
						}
					}
				},
				{ new: true }
			).populate("sent_invites");
			await User.findOneAndUpdate(
				{ _id: userId },
				{
					$addToSet: {
						threads: threadId
					}
				},
				{ new: true }
			).populate("threads");
			const updatedThread = await Thread.findOneAndUpdate(
				{ _id: threadId },
				{
					$addToSet: {
						members: userId
					}
				},
				{ new: true }
			).populate("members").populate("moderator").populate("posts");
			return updatedThread;
		},

		rejectEventInvite: async (parent, args, context) => {
			const { userId, senderId, eventId } = args;
			const updatedUser = await User.findOneAndUpdate(
				{ _id: userId },
				{
					$pull: {
						received_invites: {
							event: eventId
						}
					}
				},
				{ new: true }
			).populate("received_invites");
			await User.findOneAndUpdate(
				{ _id: senderId },
				{
					$pull: {
						sent_invites: {
							user: userId,
							event: eventId
						}
					}
				},
				{ new: true }
			).populate("sent_invites");
			return updatedUser;
		},

		rejectThreadInvite: async (parent, args, context) => {
			const { userId, senderId, threadId } = args;
			const updatedUser = await User.findOneAndUpdate(
				{ _id: userId },
				{
					$pull: {
						received_invites: {
							thread: threadId
						}
					}
				},
				{ new: true }
			).populate("received_invites");
			await User.findOneAndUpdate(
				{ _id: senderId },
				{
					$pull: {
						sent_invites: {
							user: userId,
							thread: threadId
						}
					}
				},
				{ new: true }
			).populate("sent_invites");
			return updatedUser;
		},
	}
};

module.exports = resolvers;
