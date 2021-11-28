const express = require('express');
// const mongoose = require('mongoose');
const compression = require('compression');

const logger = require('morgan');
const db = require('./config/connection');
const path = require('path');

//* Get ApolloServer and grab typeDefs and resolvers from schemas
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

//* grab express routes from the controller
// const routes = require('./controllers/index');

//* set up port and express app
const PORT = process.env.PORT || 3000;
const app = express();

//* set up the Apollo Server with the typeDefs and resolvers
const server = new ApolloServer({
	typeDefs,
	resolvers
});

app.use(logger('dev'));

//* link apollo server to express app
server.applyMiddleware({ app });

//* set up application middleware
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// //* connect to mongodb database
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cactus_social', {
// 	useNewUrlParser: true,
// 	useFindAndModify: false,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true
// });

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
