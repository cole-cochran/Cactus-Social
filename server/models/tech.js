// const mongoose = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

// const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

// const techSchema = new Schema({
//     technology: [
//         {
//             type: String
//         }
//     ],
//     date_created: {
//         type: Date,
//         default: Date.now,
//         get: (timestamp) => dateFormat(timestamp)
//     },
//     user_id: {
//         type: ObjectId,
//         ref: "User"
//     }
// });

// const TechStack = mongoose.model('TechStack', techSchema);

// module.exports = TechStack;