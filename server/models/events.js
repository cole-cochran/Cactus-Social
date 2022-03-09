const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const timeFormat = require('../utils/timeFormat');

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
		minLength: [ 3, 'Provide a title with at least 3 characters' ],
		maxLength: [ 128, 'Provide a title with less than 128 characters' ]
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: [ 10, 'Provide a description with at least 10 characters' ],
		maxLength: [ 600, 'Provide a description with less than 128 characters' ] 
    },
    start_date: {
        type: String,
        required: true,
    },
    end_date: {
        type: String,
        required: true,
    },
    start_time: {
        type: String,
        required: true,
        get: (time) => timeFormat(time)
    },
    end_time: {
        type: String,
        required: true,
        get: (time) => timeFormat(time)
    },
    owner: {
        type: ObjectId,
        ref:'User'
    },
    private: {
        type: Boolean,
        default: true
    },
    attendees: [
        {
            type: ObjectId,
            ref:'User'
        }
    ],
    category: {
        type: String,
        required: true
    },
    in_person: {
        type: Boolean,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    image_type: {
        type: String,
        default: ""
    },
    comments: [
        {
            type: ObjectId,
            ref:'Comment'
        }
    ],
    date_created: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    }
})

//! NEED A DEFAULT EVENT IMAGE WITH CACTI IN IT

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
