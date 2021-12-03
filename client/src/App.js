<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthService from './utils/auth';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import SplashPage from './pages/Splashpage/splashpage';
import Sendbird from './pages/Sendbird/Sendbird'
import EventCreation from './components/EventCreation';
=======
//*import pages
import Splashpage from './pages/Splashpage/Splashpage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

//*import browser router 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
>>>>>>> 1af4ffe6392a19580d28f8785d63b2885ba1f6f6

//* Bring in Apollo
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

//*import authService middleware
import AuthService from './utils/auth';

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

  return (
    // <SplashPage/>
    // <EventCreation/>
<<<<<<< HEAD
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
=======
    // <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Splashpage/>
          </Route>
          <Route exact path="/sign-up">
            <SignUp/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/home">
            <Dashboard/>
          </Route>
          <Route exact path="/profile">
            <Profile/>
          </Route>
        </Switch>
      </div>
    </Router>
>>>>>>> 1af4ffe6392a19580d28f8785d63b2885ba1f6f6
    // </ApolloProvider>
  );
}

export default App;
