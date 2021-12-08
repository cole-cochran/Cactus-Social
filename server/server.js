const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

//* set up port and express app
// const PORT = process.env.PORT || 3001;
const PORT = process.env.PORT || 3000;
const app = express();

//* get authentication middleware and db connection
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

//* grab typeDefs and resolvers from schemas
const { typeDefs, resolvers } = require('./schemas');

//* set up the Apollo Server with the typeDefs and resolvers
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware
});

//* link apollo server to express app
server.applyMiddleware({ app });

//* set up application middleware
app.use(logger('dev'));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('public'));

app.get('*', (req, res) => {
	console.log('[server]', 'user getting index route');
	if (process.env.NODE_ENV === 'production') {
		res.sendFile(path.join(__dirname, '../client/build/index.html'));
	} else {
		res.sendFile(path.join(__dirname, '../client/public/index.html'));
	}
});

//* set up server to listen on port and open connection to graphql
db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`App running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
