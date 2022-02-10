const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const portfolioSchema = new Schema({
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
		maxLength: [ 600, 'Provide a description with less than 600 characters' ] 
    },
    owner: {
        type: ObjectId,
        ref:'User'
    },
    image: {
        type: String,
        default: ""
    },
    responsibilities: {
        type: String,
        default: "",
        maxLength: [ 200, 'Please use 200 characters or less' ] 
    },
    techstack: {
        type: String,
        default: ""
    },
    repo: {
        type: String,
        default: ""
    },
    demo: {
        type: String,
        default: ""
    }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
