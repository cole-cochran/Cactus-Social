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
		tech_stack: [ 'JavaScript', 'React.js', 'Express.js', 'MongoDB', 'MySQL', 'CSS' ],
		// threads: [],
		// events: [],
		friends: [ 'bikerCole234', 'delmanat32', 'jackattack88', 'foxrigney1' ]
	},
	{
		first_name: 'Cole',
		last_name: 'Cochran',
		username: 'bikerCole234',
		email: 'colecochran405@gmail.com',
		password: 'sirbikesalot',
		picture: '',
		bio: 'I like to bike. How neat is that?',
		tech_stack: [ 'JavaScript', 'React.js', 'Express.js', 'MongoDB', 'MySQL', 'CSS' ],
		// threads: [],
		// events: [],
		friends: [ 'delmanat32', 'jackattack88', 'foxrigney1', 'damienluzzo33' ]
	},
	{
		first_name: 'Nathan',
		last_name: 'Delman',
		username: 'delmanat32',
		email: 'delman.nathan832@gmail.com',
		password: 'duckforluck',
		picture: '',
		bio: 'I have a weird thing with ducks',
		tech_stack: [ 'JavaScript', 'React.js', 'Express.js', 'MongoDB', 'MySQL', 'CSS' ],
		// threads: [],
		// events: [],
		friends: [ 'bikerCole234', 'jackattack88', 'foxrigney1', 'damienluzzo33' ]
	},
	{
		first_name: 'Jack',
		last_name: 'Manzer',
		username: 'jackattack88',
		email: 'jackmanzer88@gmail.com',
		password: '830bedtime',
		picture: '',
		bio: 'I code in my sleep, and I sleep in my code. Jesus is dope.',
		tech_stack: [ 'JavaScript', 'React.js', 'Express.js', 'MongoDB', 'MySQL', 'CSS' ],
		// threads: [],
		// events: [],
		friends: [ 'bikerCole234', 'delmanat32', 'foxrigney1', 'damienluzzo33' ]
	},
	{
		first_name: 'Fox',
		last_name: 'Rigney',
		username: 'foxrigney1',
		email: 'foxrigney@gmail.com',
		password: 'whoisjson',
		picture: '',
		bio: 'I make cool videos. Jesus is my homie.',
		tech_stack: [ 'JavaScript', 'React.js', 'Express.js', 'MongoDB', 'MySQL', 'CSS' ],
		// threads: [],
		// events: [],
		friends: [ 'bikerCole234', 'delmanat32', 'jackattack88', 'damienluzzo33' ]
	}
];

const threadSeeds = [
	{
		title: 'Project 3 Ideas',
		moderator: 'damienluzzo33',
		// _id: "111111111111",
		members: [ 'bikerCole234', 'delmanat32', 'jackattack88', 'damienluzzo33', 'foxrigney1' ]
		// posts: [],
		// events: []
	},
	{
		title: 'Camping Trip',
		moderator: 'bikerCole234',
		// _id: "222222222222",
		members: [ 'bikerCole234', 'delmanat32', 'jackattack88', 'damienluzzo33', 'foxrigney1' ]
		// posts: [],
		// events: []
	}
];

const postSeeds = [
	{
		post_text:
			"Hey team! In this thread, let's toss around some ideas for project 3. I definitely want to do a social media app. Maybe we can start by making it a social media for developers. Thoughts?",
		// edited: false,
		// pinned: false,
		author: 'damienluzzo33',
		thread: "Project 3 Ideas",
		// _id: "101101101101"
		// reactions: [],
		// comments: []
	},
	{
		post_text: "Bet. I'm gonna start making the video and designing some sick backgrounds.",
		// edited: false,
		// pinned: false,
		author: 'foxrigney1',
		thread: "Project 3 Ideas",
		// _id: "102102102102"
		// reactions: [],
		// comments: []
	},
	{
		post_text: "Sounds good! Let's start making this thing! I want to work on the frontend.",
		// edited: false,
		// pinned: false,
		author: 'jackattack88',
		thread: "Project 3 Ideas",
		// _id: "103103103103"
		// reactions: [],
		// comments: []
	},
	{
		post_text:
			'I was thinking we could plan a camping trip for after the bootcamp. How does that sound to everyone?',
		// edited: false,
		// pinned: false,
		author: 'bikerCole234',
		thread: 'Camping Trip',
		// _id: "201201201201"
		// reactions: [],
		// comments: []
	},
	{
		post_text: 'Hell yes. We should definitely do something like that.',
		// edited: false,
		// pinned: false,
		author: 'delmanat32',
		thread: 'Camping Trip',
		// _id: "202202202202"
		// reactions: [],
		// comments: []
	},
	{
		post_text: "That would be dope. I'll bring marshmallows!",
		// edited: false,
		// pinned: false,
		author: 'foxrigney1',
		thread: 'Camping Trip',
		// _id: "203203203203"
		// reactions: [],
		// comments: []
	}
];

const commentPostSeeds = [
	{
		comment_text: 'We should do a Star Wars theme.',
		edited: false,
		author: 'foxrigney1',
		// post: "101101101101",
		// _id: "100110011001"
		// reactions: []
	},
	{
		comment_text: 'How neat is that?',
		edited: false,
		author: 'bikerCole234',
		// post: "102102102102",
		// _id: "100210021002"
		// reactions: []
	},
	{
		comment_text: "I'd love to join in on some of the frontend stuff if that's cool.",
		edited: false,
		author: 'bikerCole234',
		// post: "103103103103",
		// _id: "100310031003"
		// reactions: []
	},
	{
		comment_text: "I'm in! 100%",
		edited: false,
		author: 'damienluzzo33',
		// post: "201201201201",
		// _id: "200120012001"
		// reactions: []
	},
	{
		comment_text: 'You should def visit Austin for that.',
		edited: false,
		author: 'bikerCole234',
		// post: "202202202202",
		// _id: "200220022002"
		// reactions: []
	},
	{
		comment_text: 'I will bring chocolate.',
		edited: false,
		author: 'jackattack88',
		// post: "203203203203",
		// _id: "200320032003"
		// reactions: []
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
		owner: 'bikerCole234',
		thread: 'Camping Trip',
		// image: "",
		// comments: [],
		attendees: [ 'bikerCole234', 'delmanat32', 'jackattack88', 'damienluzzo33', 'foxrigney1' ],
        // _id: "100011000100"
	}
];

const commentEventSeeds = [
	{
		comment_text: 'Bet',
		edited: false,
		author: 'foxrigney1',
		// event: "100011000100",
		// _id: "300130013001"
		// reactions: []
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

		await User.create(userSeeds);

		for (let i = 0; i < threadSeeds.length; i++) {
			const { title, moderator } = await Thread.create(threadSeeds[i]);
			await User.findOneAndUpdate(
				{ username: moderator },
				{
					$addToSet: {
						threads: title
					}
				}
			);
		}

		

		for (let i = 0; i < postSeeds.length; i++) {
			const { _id, thread } = await Post.create(postSeeds[i]);
			await Thread.findOneAndUpdate(
				{ title: thread },
				{
					$addToSet: {
						posts: _id
					}
				}
			);
		}

		for (let i = 0; i < eventSeeds.length; i++) {
			const { _id, thread } = await Event.create(eventSeeds[i]);
			await Thread.findOneAndUpdate(
				{ title: thread },
				{
					$addToSet: {
						events: _id
					}
				}
			);

			// for (let i = 0; i < attendees.length; i++) {
			// 	await User.findOneAndUpdate(
			// 		{ _id: attendees[i] },
			// 		{
			// 			$addToSet: {
			// 				events: 
			// 			}
			// 		}
			// 	);
			// }
		}

		for (let i = 0; i < commentPostSeeds.length; i++) {
			const { _id, post } = await Comment.create(commentPostSeeds[i]);
			await Post.findOneAndUpdate(
				{ _id: post },
				{
					$addToSet: {
						comments: _id
					}
				}
			);
		}

		for (let i = 0; i < commentEventSeeds.length; i++) {
			const { _id, event } = await Comment.create(commentEventSeeds[i]);
			await Event.findOneAndUpdate(
				{ _id: event },
				{
					$addToSet: {
						comments: _id
					}
				}
			);
		}

		console.log('All seeds successfully inserted!');
		process.exit(0);
        
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
});
