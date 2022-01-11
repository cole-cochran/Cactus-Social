const Thread = require("./threads");
const User = require("./users");
const Post = require("./posts");
const Comment = require("./comments");
const Event = require("./events");

module.exports = {
    User: User,
    Thread: Thread,
    Event: Event,
    Post: Post,
    Comment: Comment
};
