import React from 'react';
import LoginForm from './LoginForm.jsx';
import Homepage from './Homepage.jsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  render() {

    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route path="/homepage" component={Homepage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
