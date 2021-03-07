import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const About = () => <h2>About</h2>;

const Company = () => <h2>Company</h2>;

const User = ({ match }) => (
  <div>
    <h2>User: {match.params.user}</h2>
  </div>
);

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/company">Company</Link>
          </li>
          <li>
            <Link to="/kim">Kim</Link>
          </li>
          <li>
            <Link to="/chris">Chris</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about" component={About} />
          <Route path="/company" component={Company} />
          <Route path="/:user" component={User} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

/**
 *    <Route path='/:user' component={User }/>   
 This is a dynamic route meaning we can swap out the different users & each time the user changes we will still just render the user component 
 & match.params.user will be whatever that user's id is.

 * The problem with this (<Route path='/:user' component={User }/>) is that with routes, routes can match in more than one place.
  So if we come to "/about", not only is this route gonna render the about page, but also our route here (<Route path='/:user' component={User}/>) is gonna match
   as React Router assumes that About is just a user because this pattern ('/about') is same as this pattern ('/:user')
 
   If we render our app, if we go to "/about", About route or component will be rendered but also our user component.
   The reason for is when we go to "/about", this path ":user" is also gonna match whic then gives us the user component.

   So we use Switch component. It will render the first path that matches and nothin else after that.
 
   */
