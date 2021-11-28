const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId;

const commentSchema = new Schema({
    comment_text: {
        type: String,
        required: true,
        minLength: [ 2, 'Your post should be longer than that!' ],
        maxLength: [ 5000, 'Your post is too long!' ]
    },
    date_created: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    author: {
        type: String,
        ref:'User',
        required: true
    },
    reactions: [
        {
            type: String
        }
    ],
    edited: {
        type: Boolean,
        default: false
    },
    post: {
        type: ObjectId,
        ref:'Post'
    },
    event: {
        type: ObjectId,
        ref: "Event"
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;