const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId;

const chatSchema = new Schema({
    users: [
        {
            type: ObjectId,
            ref:'User'
        }
    ],
    messages: [
        {
            type: ObjectId,
            ref: "ChatMessage"
        }
    ],
    date_created: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;