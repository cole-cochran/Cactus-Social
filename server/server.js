const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');

//* set up port and express app
const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT || 3000;
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
app.use(cors());
// app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//* http server that will serve the socket io server
const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
	cors: {
		origin: "*",
		methods: ['GET', 'POST']
	}
});

//* on websocket connection console logs a user connected
//* on websocket disconnect logs a user disconnected
io.on('connection', (socket) => {
	console.log(`user ${socket.id} connected`);
	const count = io.engine.clientsCount;
	console.log(`${count} users connected`);
	// console.log(socket.id);

	socket.on("join_thread", (data) => {
		socket.rooms.forEach(room => {
			socket.leave(room);
			console.log(`User ${socket.id} leaving room ${room} to join thread`);
		});
		socket.join(data.room);
		console.log(`User ${socket.id} has joined thread ${data.room}`);
	});

	socket.on("join_post", (data) => {
		socket.rooms.forEach(room => {
			socket.leave(room);
			console.log(`User ${socket.id} leaving room ${room} to join post`);
		});
		socket.join(data.room);
		console.log(`User ${socket.id} has joined post ${data.room}`);
	});

	socket.on("join_event", (data) => {
		socket.rooms.forEach(room => {
			socket.leave(room);
		});
		socket.join(data.room);
	})

	// socket.on("leave_existing_thread", (socket) => {
	// 	console.log("leave existing thread");
	// 	socket.leaveAll();
	// })

	socket.on("send_post", (data) => {
		console.log(socket.id);
		console.log(`${data.user} has sent post ${data.post} to room ${data.room}`);
		socket.to(data.room).emit("receive_post", data.post);
	});

	socket.on("send_comment", (data) => {
		console.log(socket.id);
		console.log(`${data.user} has sent comment ${data.comment} to room ${data.room}`);
		socket.to(data.room).emit("receive_comment", data.comment);
	})

	socket.on('disconnect', () => {
		console.log(`user ${socket.id} has disconnected`);
	});

	socket.on('end', () => {
		socket.disconnect();
		console.log(io.engine.clientsCount);
	})
});

//* set up server to listen on port and open connection to graphql
db.once('open', () => {
	httpServer.listen(PORT, () => {
		console.log(`Server running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
