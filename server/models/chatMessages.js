const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId;

const chatMessagesSchema = new Schema({
    sender: {
        type: ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    },
    edited: {
        type: Boolean,
        default: false
    },
    chat: {
        type: ObjectId,
        ref: "Chat"
    },
    date_created: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
});

const ChatMessages = mongoose.model('ChatMessages', chatMessagesSchema);

module.exports = ChatMessages;