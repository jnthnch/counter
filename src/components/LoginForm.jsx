import React from 'react';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();

  }


  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted')
  }

  render() {
    return (
      <div className='main'>
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
