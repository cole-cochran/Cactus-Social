var mongoose = require('mongoose');
var db = require('../config/connection');

const {
	User,
	Thread,
	Event,
	Comment,
	Post
} = require('../models/index')

const userSeeds = [
	{
		first_name: "Damien",
		last_name: "Luzzo",
		username: "damienluzzo33",
		email: "damienluzzo33@gmail.com",
		password: "shroomisbetter",
		picture: "",
		bio: "I love coding and working out!",
		tech_stack: ["JavaScript", "React.js", "Express.js", "MongoDB", "MySQL", "CSS"],
	},
	{
		first_name: "Cole",
		last_name: "Cochran",
		username: "bikerCole234",
		email: "colecochran405@gmail.com",
		password: "sirbikesalot",
		picture: "",
		bio: "I like to bike. How neat is that?",
		tech_stack: ["JavaScript", "React.js", "Express.js", "MongoDB", "MySQL", "CSS"],
	},
	{
		first_name: "Nathan",
		last_name: "Delman",
		username: "delmanat32",
		email: "delman.nathan832@gmail.com",
		password: "duckforluck",
		picture: "",
		bio: "I have a weird thing with ducks",
		tech_stack: ["JavaScript", "React.js", "Express.js", "MongoDB", "MySQL", "CSS"],
	},
	{
		first_name: "Jack",
		last_name: "Manzer",
		username: "jackattack88",
		email: "jackmanzer88@gmail.com",
		password: "830bedtime",
		picture: "",
		bio: "I code in my sleep, and I sleep in my code. Jesus is dope.",
		tech_stack: ["JavaScript", "React.js", "Express.js", "MongoDB", "MySQL", "CSS"],
	},
	{
		first_name: "Fox",
		last_name: "Rigney",
		username: "foxrigney1",
		email: "foxrigney@gmail.com",
		password: "whoisjson",
		picture: "",
		bio: "I make cool videos. Jesus is my homie.",
		tech_stack: ["JavaScript", "React.js", "Express.js", "MongoDB", "MySQL", "CSS"],
	}
];

const threadSeeds = [{
	title: "Project 3 Ideas",
},
{
	title: "Camping Trip",
}
];

const postSeeds = [{
	post_text: "Hey team! In this thread, let's toss around some ideas for project 3. I definitely want to do a social media app. Maybe we can start by making it a social media for developers. Thoughts?",
	reactions: [],
	edited: false,
},
{
	post_text: "Bet. I'm gonna start making the video and designing some sick backgrounds.",
	reactions: [],
	edited: false,
},
{
	post_text: "Sounds good! Let's start making this thing! I want to work on the frontend.",
	reactions: [],
	edited: false,
},
{
	post_text: "I was thinking we could plan a camping trip for after the bootcamp. How does that sound to everyone?",
	reactions: [],
	edited: false,
},
{
	post_text: "Hell yes. We should definitely do something like that.",
	reactions: [],
	edited: false,
},
{
	post_text: "That would be dope. I'll bring marshmallows!",
	reactions: [],
	edited: false,
}
]

const commentSeeds = [{
	comment_text: "We should do a Star Wars theme.",
	reactions: [],
	edited: false,
},
{
	comment_text: "How neat is that?",
	reactions: [],
	edited: false,
},
{
	comment_text: "I'd love to join in on some of the frontend stuff if that's cool.",
	reactions: [],
	edited: false,
},
{
	comment_text: "I'm in! 100%",
	reactions: [],
	edited: false,
},
{
	comment_text: "You should def visit Austin for that.",
	reactions: [],
	edited: false,
},
{
	comment_text: "I will bring chocolate.",
	reactions: [],
	edited: false,
}
]

const eventSeeds = [{
	title: "Camping Trip",
	description: "Let's go camping in February! Let's plan for a two night trip out in nature. Bring a sleeping bag, backpack, and everything you need to spend a few days off the grid.",
	start_date: 1/15/2022,
	end_date: 1/17/2022,
	start_time: 10,
	end_time: 10,
	category: "trip",
	in_person: true,
	location: "TBD",
	// images: ,
	// comments: ,
}];

		//await tempCommentPost.save()

db.once('open', async () => {
	// clean database
	await User.deleteMany({});
	await Thread.deleteMany({});
	await Post.deleteMany({});
	await Comment.deleteMany({});
	await Event.deleteMany({});
	// bulk create each model

	const users = await User.insertMany(userSeeds);
	const threads = await Thread.insertMany(threadSeeds);

	const posts = await Post.insertMany(postSeeds);
	console.log(posts)
	const events = await Event.insertMany(eventSeeds);

	const comments=await Comment.insertMany(commentSeeds);
	console.log(comments)
	for (newUsers of users) {
		// randomly add users to threads

		const tempMembers = threads[Math.floor(Math.random() * threads.length)];

		tempMembers.members.push(newUsers._id);

		await tempMembers.save();

		//randomly add users to event-attentees

		const tempAttendees = events[Math.floor(Math.random() * events.length)];

		tempAttendees.attendees.push(newUsers._id);

		tempMembers.moderator.push(newUsers._id);

		await tempAttendees.save();

		// randomly add a thread for users
		const tempThread = threads[Math.floor(Math.random() * threads.length)];

		newUsers.threads = tempThread._id;

		//.moderator.push(newUsers._id);
		await newUsers.save();

		for(newPost of posts){
			const tempThreadPost=threads[Math.floor(Math.random() * threads.length)];
	
			tempThreadPost.posts.push(newPost._id);
	
			await tempThreadPost.save()
	
			//const tempCommentPost = comments[Math.floor(Math.random() * comments.length)];
	
				//newPost.comments=tempCommentPost._id
	
			//await tempCommentPost.save()
		}}
		console.log('all done!');
		process.exit(0);
	}); 



// db.User
// 	.deleteMany({})
// 	.then(() => db.User.collection.insertMany(userSeeds))
// 	.then((data) => {
// 		console.log(data.result.n + ' records inserted!');
// 		process.exit(0);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		process.exit(1);
// 	});

// db.Thread
// 	.deleteMany({})
// 	.then(() => db.Thread.collection.insertMany(threadSeeds))
// 	.then((data) => {
// 		console.log(data.result.n + ' records inserted!');
// 		process.exit(0);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		process.exit(1);
// 	});

// db.Post
// 	.deleteMany({})
// 	.then(() => db.Post.collection.insertMany(postSeeds))
// 	.then((data) => {
// 		console.log(data.result.n + ' records inserted!');
// 		process.exit(0);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		process.exit(1);
// 	});

// db.Comment
// 	.deleteMany({})
// 	.then(() => db.Comment.collection.insertMany(commentSeeds))
// 	.then((data) => {
// 		console.log(data.result.n + ' records inserted!');
// 		process.exit(0);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		process.exit(1);
// 	});

// db.Event
// 	.deleteMany({})
// 	.then(() => db.Event.collection.insertMany(eventSeeds))
// 	.then((data) => {
// 		console.log(data.result.n + ' records inserted!');
// 		process.exit(0);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		process.exit(1);
// 	});

