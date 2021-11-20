const mongoose = require('mongoose');

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
        default: Date.now
    },
    author: {
        type: ObjectId
    },
    reactions: [
        {
            type: Object
        }
    ],
    edited: {
        type: Boolean,
        default: false
    },
    post: {
        type: ObjectId
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;