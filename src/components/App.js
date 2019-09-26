import React from 'react';
import LoginForm from './LoginForm.jsx';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <LoginForm></LoginForm>
      </div>
    );
  }
}

export default App;
