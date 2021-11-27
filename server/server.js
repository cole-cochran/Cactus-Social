const express = require('express');
const compression = require("compression");
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const path =require('path');

const server = new ApolloServer({
	typeDefs,
	resolvers,
  });

const PORT = process.env.PORT || 3000;

const app = express();


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


db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`App running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
