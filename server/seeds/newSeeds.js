var mongoose = require('mongoose');
var db = require('../config/connection');

const { User, Thread, Event, Comment, Post } = require('../models/index');

const userSeeds = [
	{
		first_name: 'Damien',
		last_name: 'Luzzo',
		username: 'damienluzzo33',
		email: 'damienluzzo33@gmail.com',
		password: 'shroomisbetter',
		picture: '',
		bio: 'I love coding and working out!',
		tech_stack: [ 'JavaScript', 'React.js', 'Express.js', 'MongoDB', 'MySQL', 'CSS' ]
	},
	{
		first_name: 'Cole',
		last_name: 'Cochran',
		username: 'bikerCole234',
		email: 'colecochran405@gmail.com',
		password: 'sirbikesalot',
		picture: '',
		bio: 'Cole appreciates neature walk and biking. He also likes hats and computer hardware. He used to work at the apple store.',
		tech_stack: [ 'JavaScript', 'React.js', 'Express.js', 'MongoDB', 'MySQL', 'CSS' ]
	},
	{
		first_name: 'Nathan',
		last_name: 'Delman',
		username: 'delmanat32',
		email: 'delman.nathan832@gmail.com',
		password: 'duckforluck',
		picture: '',
		bio: 'I have a weird thing with ducks',
		tech_stack: [ 'JavaScript', 'React.js', 'Express.js', 'MongoDB', 'MySQL', 'CSS' ]
	},
	{
		first_name: 'Jack',
		last_name: 'Manzer',
		username: 'jackattack88',
		email: 'jackmanzer88@gmail.com',
		password: '830bedtime',
		picture: '',
		bio: 'I code in my sleep, and I sleep in my code. Jesus is dope.',
		tech_stack: [ 'JavaScript', 'React.js', 'Express.js', 'MongoDB', 'MySQL', 'CSS' ]
	},
	{
		first_name: 'Fox',
		last_name: 'Rigney',
		username: 'foxrigney1',
		email: 'foxrigney@gmail.com',
		password: 'whoisjson',
		picture: '',
		bio: 'I make cool videos. Jesus is my homie.',
		tech_stack: [ 'JavaScript', 'React.js', 'Express.js', 'MongoDB', 'MySQL', 'CSS' ]
	}
];

const threadSeeds = [
	{
		title: 'Project 3 Ideas'
	},
	{
		title: 'Camping Trip'
	}
];

const postSeeds = [
	{
		post_text:
			"Hey team! In this thread, let's toss around some ideas for project 3. I definitely want to do a social media app. Maybe we can start by making it a social media for developers. Thoughts?",
		edited: false,
		pinned: false
	},
	{
		post_text: "Bet. I'm gonna start making the video and designing some sick backgrounds.",
		edited: false,
		pinned: false
	},
	{
		post_text: "Sounds good! Let's start making this thing! I want to work on the frontend.",
		edited: false,
		pinned: false
	},
	{
		post_text:
			'I was thinking we could plan a camping trip for after the bootcamp. How does that sound to everyone?',
		edited: false,
		pinned: false
	},
	{
		post_text: 'Hell yes. We should definitely do something like that.',
		edited: false,
		pinned: false
	},
	{
		post_text: "That would be dope. I'll bring marshmallows!",
		edited: false,
		pinned: false
	}
];

const commentPostSeeds = [
	{
		comment_text: 'We should do a Star Wars theme.',
		edited: false
	},
	{
		comment_text: 'How neat is that?',
		edited: false
	},
	{
		comment_text: "I'd love to join in on some of the frontend stuff if that's cool.",
		edited: false
	},
	{
		comment_text: "I'm in! 100%",
		edited: false
	},
	{
		comment_text: 'You should def visit Austin for that.',
		edited: false
	},
	{
		comment_text: 'I will bring chocolate.',
		edited: false
	}
];

const eventSeeds = [
	{
		title: 'Camping Trip',
		description:
			"Let's go camping in February! Let's plan for a two night trip out in nature. Bring a sleeping bag, backpack, and everything you need to spend a few days off the grid.",
		start_date: "1/15/2022",
		end_date: "1/17/2022",
		start_time: "10",
		end_time: "12",
		category: 'trip',
		in_person: true,
		location: 'TBD',
		image: ""
	}
];

const commentEventSeeds = [
	{
		comment_text: 'Bet',
		edited: false
	}
];

db.once('open', async () => {
	try {
		await User.deleteMany({});
		await Thread.deleteMany({});
		await Post.deleteMany({});
		await Comment.deleteMany({});
		await Event.deleteMany({});

		console.log('Collections Dropped Successfully!');

		const allUsers = await User.create(userSeeds);

		// console.log(allUsers)

		for (let user of allUsers) {
			let others = allUsers.filter((other) => (
				other._id !== user._id
			));
			await User.findOneAndUpdate(
				{ _id: user._id },
				{
					$set: {
						friends: [...others]
					}
				},
				{new: true}
			)
		}

		console.log("USER SEED SUCCESS")

		for (let i = 0; i < threadSeeds.length; i++) {
			const { _id } = await Thread.create(threadSeeds[i]);
			const { moderator } = await Thread.findOneAndUpdate(
				{ _id: _id },
				{
					moderator: allUsers[Math.floor(Math.random() * allUsers.length)]._id,
					$set: {
						members: [...allUsers]
					}
				},
				{new: true}
			)
			await User.findOneAndUpdate(
				{ _id: moderator },
				{
					$addToSet: {
						threads: _id
					}
				},
				{new:true}
			);
			let { members } = await Thread.findOne({_id: _id});
			for (let member of members) {
				await User.findOneAndUpdate(
					{ _id: member._id },
					{
						$addToSet: {
							threads: _id
						}
					},
					{new: true}
				)
			}
		}

		console.log("THREAD SEED SUCCESS")

		const allThreads = await Thread.find({});

		for (let i = 0; i < postSeeds.length; i++) {
			let { _id } = await Post.create(postSeeds[i]);
			let { thread } = await Post.findOneAndUpdate(
				{ _id: _id },
				{
					author: allUsers[Math.floor(Math.random() * allUsers.length)]._id,
					thread: allThreads[Math.floor(Math.random() * allThreads.length)]._id
				},
				{new: true}
			)
			
			await Thread.findOneAndUpdate(
				{ _id: thread },
				{
					$addToSet: {
						posts: _id
					}
				},
				{new: true}
			);
		}

		console.log("POST SEED SUCCESS")

		const allPosts = await Post.find({});

		for (let i = 0; i < eventSeeds.length; i++) {
			let { _id } = await Event.create(eventSeeds[i]);
			let { thread, owner, attendees } = await Event.findOneAndUpdate(
				{ _id: _id},
				{
					owner: allUsers[Math.floor(Math.random() * allUsers.length)]._id,
					thread: allThreads[Math.floor(Math.random() * allThreads.length)]._id,
					$set: {
						attendees: [...allUsers]
					}
				},
				{new: true}
			)

			await Thread.findOneAndUpdate(
				{ _id: thread },
				{
					$addToSet: {
						events: _id
					}
				},
				{new: true}
			);

			await User.findOneAndUpdate(
				{ _id: owner},
				{
					$addToSet: {
						events: _id
					}
				},
				{new:true}
			);

			for (let i = 0; i < attendees.length; i++) {
				await User.findOneAndUpdate(
					{ _id: attendees[i] },
					{
						$addToSet: {
							events: _id
						}
					},
					{new: true}
				);
			}
		}

		console.log("EVENT SEED SUCCESS")

		const allEvents = await Event.find({});

		for (let i = 0; i < commentPostSeeds.length; i++) {
			let { _id } = await Comment.create(commentPostSeeds[i]);
			let { post } = await Comment.findOneAndUpdate(
				{ _id: _id },
				{
					author: allUsers[Math.floor(Math.random() * allUsers.length)]._id,
					post: allPosts[Math.floor(Math.random() * allPosts.length)]._id
				},
				{new: true}
			)
			await Post.findOneAndUpdate(
				{ _id: post },
				{
					$addToSet: {
						comments: _id
					}
				},
				{new: true}
			)
		}

		console.log("POST COMMENT SEED SUCCESS")

		for (let i = 0; i < commentEventSeeds.length; i++) {
			let { _id } = await Comment.create(commentEventSeeds[i]);
			let { event } = await Comment.findByIdAndUpdate(
				{ _id: _id },
				{
					author: allUsers[Math.floor(Math.random() * allUsers.length)]._id,
					event: allEvents[Math.floor(Math.random() * allEvents.length)]._id
				},
				{new:true}
			)
			await Event.findOneAndUpdate(
				{ _id: event },
				{
					$addToSet: {
						comments: _id
					}
				},
				{new:true}
			);
		}

		console.log("EVENT COMMENT SEED SUCCESS")

		console.log('All seeds successfully inserted!');
		process.exit(0);
        
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
});
