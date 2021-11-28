const express = require('express');
const compression = require("compression");
// const routes = require("./controllers/index");
const { ApolloServer } = require('apollo-server-express');

const logger = require('morgan');
const db = require('./config/connection');
const path = require('path');

const path =require('path');

//* grab express routes from the controller
// const routes = require('./controllers/index');

// const mongoose = require('mongoose');
//* Get ApolloServer and grab typeDefs and resolvers from schemas
//* set up port andexpress app
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));

server.applyMiddleware({ app });

app.use(compression());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));


// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static(path.join(__dirname, '../client/build')));
//   }

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/public/index.html'));
  });

//* connect to mongodb database

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

//* set up middleware for routes
// app.use(routes);

//* set up server to listen on port and open connection to graphql
db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`App running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
