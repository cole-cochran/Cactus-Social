const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const techSchema = new Schema({
    technology: [
        {
            type: String
        }
    ],
    date_create: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: ObjectId,
        ref: "User"
    }
});

const Tech = mongoose.model('Tech', techSchema);

module.exports = Tech;