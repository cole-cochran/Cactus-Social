const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const threadSchema = new Schema({
    title: {
        type: String,
        required: "You must provide a title for your thread",
        trim: true,
        minLength: [3, "Provide a title with at least 3 characters"],
        maxLength: [128, "Provide a title with less than 128 characters"],
    },
    posts: [
        {
            type: String,
            required: true,
            default: "Your Thread Has Been Created!",
            minLength: [2, "Your post should be longer than that!"],
            maxLength: [5000, "Your post is too long!"],
            dateCreated: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    pins: [
        {
            type: String
        }
    ],
    comments: [
        {
            type: String,
            dateCreated: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    moderators: [
        {
            type: String
        }
    ],
    members: [
        {
            type: String
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;