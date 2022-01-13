const Thread = require("./threads");
const User = require("./users");
const Post = require("./posts");
const Comment = require("./comments");
const Event = require("./events");
const PinnedPost = require('./pinnedPosts');
// const Tech = require("./tech");

module.exports = {
    // Tech: Tech,
    User: User,
    Thread: Thread,
    Event: Event,
    Post: Post,
    Comment: Comment,
    PinnedPost: PinnedPost
};
