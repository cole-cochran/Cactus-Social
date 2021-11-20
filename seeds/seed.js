var mongoose = require('mongoose');
var db = require('../models');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cactus_social', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const userSeeds = [
	{
		_id: 33,
		first_name: "Damien",
		last_name: "Luzzo",
		username: "damienluzzo33",
		email: "damienluzzo33@gmail.com",
		password: "shroomisbetter",
		picture: "",
		bio: "I love coding and working out!",
		threads: [101,202],
		teach_stack: ["JavaScript", "React.js", "Express.js", "MongoDB", "MySQL", "CSS"],
		date_joined: 11/15/2021
	},
	{
		_id: 22,
		first_name: "Cole",
		last_name: "Cochran",
		username: "bikerCole234",
		email: "colecochran405@gmail.com",
		password: "sirbikesalot",
		picture: "",
		bio: "I like to bike. How neat is that?",
		threads: [101,202],
		teach_stack: ["JavaScript", "React.js", "Express.js", "MongoDB", "MySQL", "CSS"],
		date_joined: 11/16/2021
	},
	{
		_id: 11,
		first_name: "Nathan",
		last_name: "Delman",
		username: "delmanat32",
		email: "delman.nathan832@gmail.com",
		password: "duckforluck",
		picture: "",
		bio: "I have a weird thing with ducks",
		threads: [101,202],
		teach_stack: ["JavaScript", "React.js", "Express.js", "MongoDB", "MySQL", "CSS"],
		date_joined: 11/17/2021
	},
	{
		_id: 44,
		first_name: "Jack",
		last_name: "Manzer",
		username: "jackattack88",
		email: "jackmanzer88@gmail.com",
		password: "830bedtime",
		picture: "",
		bio: "I code in my sleep, and I sleep in my code. Jesus is dope.",
		threads: [101,202],
		teach_stack: ["JavaScript", "React.js", "Express.js", "MongoDB", "MySQL", "CSS"],
		date_joined: 11/15/2021
	},
	{
		_id: 55,
		first_name: "Fox",
		last_name: "Rigney",
		username: "foxrigney1",
		email: "foxrigney@gmail.com",
		password: "whoisjson",
		picture: "",
		bio: "I make cool videos. Jesus is my homie.",
		threads: [101,202],
		teach_stack: ["JavaScript", "React.js", "Express.js", "MongoDB", "MySQL", "CSS"],
		date_joined: 11/17/2021
	}
];

const threadSeeds = [
	{
		_id: 101,
		title: "Project 3 Ideas",
		posts: [
			1,2,3
		],
		pins: [
			1,2
		],
		events: [
			2
		],
		moderator: 33,
		members: [
			11,22,33,44,55
		],
		date_created: 11/17/2021
	},
	{
		_id: 202,
		title: "Camping Trip",
		posts: [
			1,2,3
		],
		pins: [
			1
		],
		moderator: 22,
		members: [
			11,22,33,44,55
		],
		date_created: 11/19/2021
	}
];

const postSeeds = [
	{
		_id: 1,
		post_text: "",
		date_created: "",
		author: 33,
		reactions: [],
		edited: false,
		thread: 101
	},
	{
		_id: 2,
		post_text: "",
		date_created: "",
		author: 55,
		reactions: [],
		edited: false,
		thread: 101
	},
	{
		_id: 3,
		post_text: "",
		date_created: "",
		author: 44,
		reactions: [],
		edited: false,
		thread: 101
	},
	{
		_id: 4,
		post_text: "",
		date_created: "",
		author: 22,
		reactions: [],
		edited: false,
		thread: 202
	},
	{
		_id: 5,
		post_text: "",
		date_created: "",
		author: 11,
		reactions: [],
		edited: false,
		thread: 202
	},
	{
		_id: 6,
		post_text: "",
		date_created: "",
		author: 55,
		reactions: [],
		edited: false,
		thread: 202
	}
]

const commentSeeds = [
	{
		_id: 1,
		comment_text: "",
		date_created: "",
		author: 11,
		reactions: [],
		edited: false,
		post: 2
	},
	{
		_id: 2,
		comment_text: "",
		date_created: "",
		author: 22,
		reactions: [],
		edited: false,
		post: 2
	},
	{
		_id: 3,
		comment_text: "",
		date_created: "",
		author: 22,
		reactions: [],
		edited: false,
		post: 3
	},
	{
		_id: 4,
		comment_text: "",
		date_created: "",
		author: 44,
		reactions: [],
		edited: false,
		post: 4
	},
	{
		_id: 5,
		comment_text: "",
		date_created: "",
		author: 55,
		reactions: [],
		edited: false,
		post: 5
	},
	{
		_id: 6,
		comment_text: "",
		date_created: "",
		author: 33,
		reactions: [],
		edited: false,
		post: 5
	}
]

const eventSeeds = [{}]


db.User.deleteMany({})
	.then(() => db.User.collection.insertMany(userSeeds))
	.then((data) => {
		console.log(data.result.n + ' records inserted!');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});

db.Thread
	.deleteMany({})
	.then(() => db.Thread.collection.insertMany(threadSeeds))
	.then((data) => {
		console.log(data.result.n + ' records inserted!');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});

db.Post
	.deleteMany({})
	.then(() => db.Post.collection.insertMany(postSeeds))
	.then((data) => {
		console.log(data.result.n + ' records inserted!');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});

db.Comment
	.deleteMany({})
	.then(() => db.Comment.collection.insertMany(commentSeeds))
	.then((data) => {
		console.log(data.result.n + ' records inserted!');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});

db.Event
	.deleteMany({})
	.then(() => db.Event.collection.insertMany(eventSeeds))
	.then((data) => {
		console.log(data.result.n + ' records inserted!');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});