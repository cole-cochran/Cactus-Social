const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId;

const pinnedPostsSchema = new Schema({
    pinTitle: {
        type: String,
        minLength: [3, "Pin title needs to be at least 3 characters!"],
        maxLength: [36, "Pin title needs to be less than 36 characters!"]
    },
    pinHash: {
        type: String,
        minLength: [3, "Pin hash needs to be at least 3 characters!"],
        maxLength: [18, "Pin hash needs to be less than 18 characters!"]
    },
    post: {
        type: ObjectId,
        ref: 'posts'
    }
});

const PinnedPost = mongoose.model('PinnedPost', pinnedPostsSchema);

module.exports = PinnedPost;