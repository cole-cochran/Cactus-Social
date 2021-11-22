const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema({
    post_text: {
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
        type: ObjectId,
        ref:'User'
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
    thread: {
        type: ObjectId,
        ref:'Thread'
    },
    comments: [
        {
            type: ObjectId
        }
    ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;