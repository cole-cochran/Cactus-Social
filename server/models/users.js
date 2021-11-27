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
		lowercase: true,
		required: 'First name is required'
	},
	last_name: {
		type: String,
		trim: true,
		lowercase: true,
		required: 'Last name is required'
	},
	username: {
		type: String,
		trim: true,
		lowercase: true,
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
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address' ]
	},
	password: {
		type: String,
		minLength: [ 6, 'You need a longer password' ],
		maxLength: [ 24, 'Your password is too long' ],
		required: 'You must provide a valid password',
		trim: true
		// validate: {...}
	},
	picture: {
		type: String
		// default: "empty profile template"
	},
	bio: {
		type: String,
		maxLength: [ 500, 'Your bio can only be 500 characters long' ]
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
			type: String,
			ref: 'User'
		}
	]
});

userSchema.pre('save', function(next) {
	var user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();
	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);
		// hash the password using our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

const User = mongoose.model('User', userSchema);

module.exports = User;
