const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
		minLength: [ 3, 'Provide a title with at least 3 characters' ],
		maxLength: [ 128, 'Provide a title with less than 128 characters' ]
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: [ 10, 'Provide a description with at least 3 characters' ],
		maxLength: [ 600, 'Provide a description with less than 128 characters' ] 
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    owner: {
        type: ObjectId
    },
    attendees: [
        {
            type: ObjectId,
            max: 50
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
    thread: {
        type: ObjectId
    },
    comments: [
        {
            type: ObjectId
        }
    ],
    date_created: {
        type: Date,
        default: Date.now
    }
})

//! NEED A DEFAULT EVENT IMAGE WITH CACTI IN IT

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
