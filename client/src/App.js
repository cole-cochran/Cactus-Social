import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthService from './utils/auth';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import SplashPage from './pages/Splashpage/splashpage';
import Sendbird from './pages/Sendbird/Sendbird'
import EventCreation from './components/EventCreation';

//* Bring in Apollo
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import ProfilePopout from './components/ProfilePopout';

//* Construct GraphQL endpoint
const httpLink = createHttpLink({ uri: (window.location.hostname === '<OUR WEBSITE>') ? '/graphql' : 'http://localhost:3000/graphql' });

//* Construct middleware for every authorization request
const authLink = setContext((_, { headers }) => {
  // get the authentication token if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});





function App() {
  // function checkAuth() {
	// 	if (AuthService.loggedIn()) {
	// 		return (
	// 			<Route>
	// 				<Sidebar setActiveChannel={setActiveChannel} usersServers={usersServers} />
	// 				<Content activeChannel={activeChannel} />
	// 				<CreateChannel />
	// 			</Route>
	// 		)
	// 	} else {
	// 		return (
	// 			<Redirect to="/login" />
	// 		)
	// 	}
	// }
  return (
    // <SplashPage/>
    // <EventCreation/>
    <Sendbird/>
    // <ApolloProvider client={client}>
    // <Router>
            //  <Route path="/signup" element={<SignUp/>}/>
          //  {<Route path="/login" element={<Login/>}/> 
          //  <Route path="/dashboard" element={<Dashboard/>}/> 
          //  <Route path="/profile" element={<Profile/>}/>
        //  <Route path="/" element={checkAuth()}/> 
          // <Route path="/sendbird" element={<Sendbird/>}/>
    // </Router> 
    // </ApolloProvider>
  );
}

export default App;
