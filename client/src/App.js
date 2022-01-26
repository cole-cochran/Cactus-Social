import React from 'react';
//*import pages
import SplashPage from './pages/Splashpage/Splashpage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Error from './pages/Error';
import EventDisplay from './components/EventDisplay';
// import EventCreation from './components/EventCreation';
//*import browser router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//* Bring in Apollo
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

//*import authService middleware
import AuthService from './utils/auth';
import Sendbird from './pages/Sendbird/Sendbird';

import {io} from 'socket.io-client';

//* Construct GraphQL endpoint
const httpLink = createHttpLink({
	uri: '/graphql'
});

//* Construct middleware for every authorization request
const authLink = setContext((_, { headers }) => {
	// get the authentication token if it exists
	const token = localStorage.getItem('id_token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		}
	};
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

const socket = io();

function App() {

	// TODO (app) Consider global state, reducers, and custom hooks

	// TODO (app) need to refactor things into their own components ?

	// TODO (app) look into getting the hashing functionality added for users posting in threads and commenting on posts and events

	// TODO (app) Force the creation of an event to create a post in the associated thread. Allow users to make event either public, open to members of shared threads, visible to friends, or private to an invite only type thing that allows them to only invite certain members of their list of friends

	// TODO (app) Need to add the ability for people to send and accept/deny friend requests. Maybe 

	// console.log(AuthService.getProfile())
	const [activeEvent, setActiveEvent] = React.useState('');
	const [activeThread, setActiveThread] = React.useState('');

	return (
		// <ThreadCreation/>
		// <SplashPage/>
		// <EventCreation/>
		<ApolloProvider client={client}>
			<Router>
				<div className="App">
					<Switch>
						<Route exact path="/">
							<SplashPage />
						</Route>
						<Route exact path="/sign-up">
							<SignUp />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/threads/:threadId">
							{AuthService.loggedIn() ? <Dashboard socket={socket} setActiveEvent={setActiveEvent} setActiveThread={setActiveThread} activeThread={activeThread}/> : <SplashPage />}
						</Route>
						<Route exact path="/profile/:userId">
							{AuthService.loggedIn() ? <Profile setActiveEvent={setActiveEvent} setActiveThread={setActiveThread}/> : <SplashPage />}
						</Route>
						<Route exact path="/chat">
							{AuthService.loggedIn() ? <Sendbird /> : <SplashPage />}
						</Route>
						<Route exact path="/subthread/:postId">
							{AuthService.loggedIn() ? <Dashboard subThread={true} socket={socket}/> : <SplashPage />}
						</Route>
						<Route exact path="/events/:eventId">
							{AuthService.loggedIn() ? <EventDisplay socket={socket} activeEvent={activeEvent} setActiveThread={setActiveThread} setActiveEvent={setActiveEvent}/> : <SplashPage />}
						</Route>
						<Route exact path="/404">
							<Error />
						</Route>
					</Switch>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;