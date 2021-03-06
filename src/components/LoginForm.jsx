import React from 'react';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const url = 'http://localhost:3000/api/users/login';
    const data = {
      username: this.usernameRef.current.value,
      password: this.passwordRef.current.value,
    }
    fetch(url, {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(this.props.history.push('/homepage'))
      .catch(error => window.confirm('Login Error', error));
  }

  render() {
    return (
      <div className="main">
        <form className="login-form">
          <div className="login-form__inputs">
            <label>
              Username:
            <input type="text" ref={this.usernameRef} defaultValue='' required></input>
            </label>
            <label>
              Password:
            <input type="password" ref={this.passwordRef} defaultValue='' required></input>
            </label>
          </div>
          <button type="submit" onClick={e => this.handleSubmit(e)}>Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
