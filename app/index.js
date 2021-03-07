// Customizing your own Link component with React Router
// Creating our own “old school” navbar. Basically what that means is we’ll add a “>” to the front of the active link.

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const OldSchoolMenuLink = ({ children, to, exact }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <div className={match ? 'active' : ''}>
        {match ? '>' : ''}
        <Link to={to}>{children}</Link>
      </div>
    )}
  />
);

const App = () => (
  <Router>
    <div>
      <OldSchoolMenuLink exact to="/">
        Home
      </OldSchoolMenuLink>
      <OldSchoolMenuLink to="/about">About</OldSchoolMenuLink>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </Router>
);
ReactDOM.render(<App />, document.getElementById('app'));

/**
 * We’re going to render a Link and if the app’s current location matches the Links path, we’ll prepend it with a >.
  How do we find out if the “app’s current location matches the Link\'s path”? Here’s one approach. We know the Links path because we’re passing it in as the to prop. We also know the app’s location because we can use window.location.pathname.
  With that said, we might implement OldSchoolMenuLink like this
  const OldSchoolMenuLink = ({ children, to, exact }) => {  const match = window.location.pathname === to  return (    <div className={match ? \'active\' : \'\'}>      {match ? \'> \' : \'\'}      <Link to={to}>        {children}      </Link>    </div>  )}

Well, this works 🤷‍. The problem is it’s not really the React or React Router way of doing things. It also feels weird to reach out to the window object to get the app’s location. There’s a better way and it involves a tool that we already have at our disposal, React Router’s Route component.

Built into it, Route has a location checker - we should utilize it. Just as we did above, if there’s a match between the app’s location and the Links path, we want to append >. If you’re already familiar with React Router, your first instinct might be to use Routes render prop. The problem with this is, by design, a Route using render will only match if the path matches. That means we’d only ever get a Link if the Routes path prop matched the app’s current location. We’re building a navbar. We need to always get a Link and then only get a > if the path matches. The good news is the React Router team predicted this shortcoming and Route has another (rarely used) prop that is exactly what we need - children. children will “render whether the path matches the location or not … It works exactly like render except that it gets called whether there is a match or not.” That’s exactly what we need. Even better, “The children render prop receives all the same route props as the component and render methods, except when a route fails to match the URL, then match is null”. What that means is that we can use match to see if we should render a > or not.

const OldSchoolMenuLink = ({ children, to, exact }) => (  <Route path={to} exact={exact} children={({ match }) => (    <div className={match ? \'active\' : \'\'}>      {match ? \'> \' : \'\'}      <Link to={to}>        {children}      </Link>    </div>  )}/>)

 */
