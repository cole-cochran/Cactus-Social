const Thread = require("./threads");
const User = require("./users");
const Post = require("./posts");
const Comment = require("./comments");
const Event = require("./events");
<<<<<<< HEAD
=======
const PinnedPost = require('./pinnedPosts');
// const Tech = require("./tech");
>>>>>>> faec9ac1079a62f6c8159cdb5a3f147c273e2020

module.exports = {
    User: User,
    Thread: Thread,
    Event: Event,
    Post: Post,
    Comment: Comment,
    PinnedPost: PinnedPost
};
