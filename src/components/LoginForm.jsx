import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='main'>
        <form className="login-form">
          <div className="login-form__inputs">
            <label>
              Username:
            <input type="text" defaultValue='' required></input>
            </label>
            <label>
              Password:
            <input type="password" defaultValue='' required></input>
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
