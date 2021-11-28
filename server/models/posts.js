const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
    pinned: {
        type: Boolean,
        default: false
    },
    pinTitle: {
        type: String,
        required: true,
        minLength: [3, "Pin title needs to be at least three characters!"],
        maxLength: [36, "Pin title needs to be at least three characters!"]
    },
    pinHash: {
        type: String,
        required: true,
        minLength: [3, "Pin hash needs to be at least three characters!"],
        maxLength: [18, "Pin hash needs to be at least three characters!"]
    },
    thread: {
        type: String,
        ref:'Thread'
    },
    comments: [
        {
            type: ObjectId,
            // ref:'Comment'
            ref: "Comment"
        }
    ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;