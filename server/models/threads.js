const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const threadSchema = new Schema({
	title: {
		type: String,
		required: [true, 'You must provide a title for your thread'],
		trim: true,
		minLength: [ 4, 'Provide a title with at least 4 characters' ],
		maxLength: [ 36, 'Provide a title with less than 36 characters' ]
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
		type: ObjectId,
		ref:'User'
	},
	members: [
		{
			type: ObjectId,
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
