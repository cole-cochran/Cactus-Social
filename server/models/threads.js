const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const threadSchema = new Schema({
	title: {
		type: String,
		required: [true, 'You must provide a title for your thread'],
		trim: true,
		minLength: [ 3, 'Provide a title with at least 3 characters' ],
		maxLength: [ 128, 'Provide a title with less than 128 characters' ]
	},
	posts: [
        {
            type: ObjectId,
			ref:'Post'
        }
    ],
    events: [
        {
            type: ObjectId,
			ref:'Event'
        }
    ],
	moderator: {
		type: String,
		ref:'User',
		required: true
	},
	members: [
		{
			type: String,
			ref:'User'
		}
	],
	date_created: {
        type: Date,
        default: Date.now,
		get: (timestamp) => dateFormat(timestamp)
    }
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
