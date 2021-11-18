var mongoose = require('mongoose');
var db = require('../models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cactus_social', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const userSeeds = [
    //! FILL THIS SHIT OUT
];

const threadSeeds = [
    //! FILL THIS SHIT OUT
];

db.User.deleteMany({})
	.then(() => db.User.collection.insertMany(userSeeds))
	.then((data) => {
		console.log(data.result.n + ' records inserted!');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});

db.Thread
	.deleteMany({})
	.then(() => db.Thread.collection.insertMany(threadSeeds))
	.then((data) => {
		console.log(data.result.n + ' records inserted!');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});

