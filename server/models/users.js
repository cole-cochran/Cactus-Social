const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

//* Set up validation for schema

var validateEmail = function(email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const userSchema = new Schema({
	first_name: {
		type: String,
		trim: true,
		required: 'First name is required',
		minLength: [ 2, 'First Name cant be less than 2 characters' ],
		maxLength: [ 40, 'First name cannot be longer than 40 character' ]
	},
	last_name: {
		type: String,
		trim: true,
		required: 'Last name is required',
		minLength: [ 2, 'Last Name cant be less than 2 characters' ],
		maxLength: [ 40, 'Last name cannot be longer than 40 character' ]
	},
	username: {
		type: String,
		trim: true,
		lowercase: true,
		minLength: [ 6, 'You need a longer username' ],
		maxLength: [ 24, 'Your username is too long' ],
		required: 'Username is required',
		unique: true
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		required: 'Email address is required',
		unique: true,
		validate: [ validateEmail, 'Please use a valid email address' ],
		match: [
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please use a valid email address'
		]
	},
	password: {
		type: String,
		minLength: [ 6, 'You need a longer password' ],
		maxLength: [ 32, 'Your password is too long' ],
		required: 'You must provide a valid password',
		trim: true
		// validate: {...}
	},
	picture: {
		type: String,
		default: ""
	},
	bio: {
		type: String,
		maxLength: [ 255, 'Your bio can only be 255 characters long' ]
	},
	threads: [
		{
			type: ObjectId,
			ref: 'Thread'
		}
	],
	events: [
		{
			type: ObjectId,
			ref: 'Event'
		}
	],
	tech_stack: [
		{
			type: String,
			trim: true
		}
	],
	date_joined: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp)
	},
	friends: [
		{
			type: ObjectId,
			ref: 'User'
		}
	],
	pinned_posts: [
		{
			type: ObjectId,
			ref: 'PinnedPost'
		}
	],
	friend_requests: [
		{
			type: ObjectId,
			ref: 'User'
		}
	],
	sent_friend_requests: [
		{
			type: ObjectId,
			ref: 'User'
		}
	],
	chats: [
		{
			type: ObjectId,
			ref: 'Chat'
		}
	],
	received_invites: [{
		user: {
			type: ObjectId,
			ref: "User"
		},
		event: {
			type: ObjectId,
			ref: "Event"
		},
		thread: {
			type: ObjectId,
			ref: "Thread"
		},
		date_created: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp)
		}
	}],
	sent_invites: [{
		user: {
			type: ObjectId,
			ref: "User"
		},
		event: {
			type: ObjectId,
			ref: "Event"
		},
		thread: {
			type: ObjectId,
			ref: "Thread"
		},
		date_created: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp)
		}
	}],
	portfolio_projects: [{
		type: ObjectId,
		ref: "Portfolio"
	}],
	github: {
		type: String,
		default: ""
	},
	linkedin: {
		type: String,
		default: ""
	},
	portfolio_page: {
		type: String,
		default: ""
	}
});

userSchema.pre('save', async function(next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}
	this.first_name.charAt(0).toUpperCase() + this.first_name.slice(1);
	this.last_name.charAt(0).toUpperCase() + this.last_name.slice(1);
	next();
});

userSchema.methods.comparePassword = async function(password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
