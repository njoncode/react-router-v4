import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';

// You can use the last <Route> in a <Switch> as a kind of
// "fallback" route, to catch 404 errors.
//
// There are a few useful things to note about this example:
//
// - A <Switch> renders the first child <Route> that matches
// - A <Redirect> may be used to redirect old URLs to new ones
// - A <Route path="*> always matches

const Home = () => <h1>Home</h1>;

const WillMatch = () => <h1>Matched!</h1>;

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/old-match">Old Match, to be redirected</Link>
          </li>
          <li>
            <Link to="/will-match">Will Match</Link>
          </li>
          <li>
            <Link to="/will-not-match">Will Not Match</Link>
          </li>
          <li>
            <Link to="/also/will/not/match">Also will not match</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect from="/old-match" to="/will-match" />
          <Route path="/will-match" component={WillMatch} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

/**
    <Route component={NoMatch} />

This route doesn't have a path, so it's always gonna match. 
So no matter, if we go to "/" or "/will-match", we are always gonna get rendered two components as this will always match since this doesn't have a path .
So to fix this, we use React Router Switch component which will only render the very first route that matches.    
We will put all of these in a switch component. 

  <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/will-match" component={WillMatch} />
          <Route component={NoMatch} />
  </Switch>

*/

/**
    <Redirect from="/old-match" to="/will-match" />
 When React Router sees that we are trying to get to the old-match path, then it's gonna redirect us from that old-match path to will-match which will then render
 WillMatch component because "/will-match" route will match.
 
 */
