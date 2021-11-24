const express = require('express');
const compression = require("compression");
// const routes = require("./controllers/index");
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const logger = require("morgan");

const path =require('path');

const server = new ApolloServer({
	typeDefs,
	resolvers,
  });

const mongoose = require('mongoose');
const compression = require('compression');

const logger = require("morgan");
const db = require('./config/connection');
const path =require('path');

//* Get ApolloServer and grab typeDefs and resolvers from schemas
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

//* grab express routes from the controller
const routes = require('./controllers/index');

//* set up port and express app
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

server.applyMiddleware({ app });

//* set up the Apollo Server with the typeDefs and resolvers
const server = new ApolloServer({
	typeDefs,
	resolvers
});

app.use(logger("dev"));

//* link apollo server to express app
server.applyMiddleware({ app });

//* set up application middleware
app.use(compression());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));


// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static(path.join(__dirname, '../client/build')));
//   }

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });
  
// routes
// app.use(routes);

db.once('open', () => {
	app.listen(PORT, () => {
	  console.log(`API server running on port ${PORT}!`);
	  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
  });
//* connect to mongodb database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cactus_social', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
});

//* set up middleware for routes
app.use(routes);

//* set up server to listen on port and open connection to graphql
db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`App running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
