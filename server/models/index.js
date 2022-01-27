const Thread = require("./threads");
const User = require("./users");
const Post = require("./posts");
const Comment = require("./comments");
const Event = require("./events");
const PinnedPost = require('./pinnedPosts');
const Chat = require('./chats');
const ChatMessage = require('./chatMessages');
// const Tech = require("./tech");

module.exports = {
    User: User,
    Thread: Thread,
    Event: Event,
    Post: Post,
    Comment: Comment,
    PinnedPost: PinnedPost,
    Chat: Chat,
    ChatMessage: ChatMessage
};
