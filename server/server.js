const express = require('express');
const mongoose = require('mongoose');
const compression = require("compression");
const routes = require("./controllers/index");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cactus_social', {
	useNewUrlParser: true,
	useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// routes
app.use(routes);

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
