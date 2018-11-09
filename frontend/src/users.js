import React from 'react';
import ReactDOM from 'react-dom';
import './users.css';

class UserForm extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {login: '',
					password: ''};
  
	  this.handleChangeLogin = this.handleChangeLogin.bind(this);
	  this.handleChangePassword = this.handleChangePassword.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}
  
	handleChangeLogin(event) {
	  this.setState({login: event.target.value});
	}

	handleChangePassword(event) {
		this.setState({password: event.target.value});
	  }
  
	handleSubmit(event) {
	  let data = {name: this.state.login, password: this.state.password};
	  // SEND USER DATA AND GET RESPONSE
	}
  
	render() {
	  return (
		<form onSubmit={this.handleSubmit}>
		  <label>
		  	<p>Login</p>
			<input type="text" value={this.state.login} onChange={this.handleChangeLogin} />
			<p>Senha</p>
			<input type="password" value={this.state.password} onChange={this.handleChangePassword} />
		  </label>
		  <input type="submit" value="Login" />
		</form>
	  );
	}
  }

  ReactDOM.render(
	<UserForm />,
	document.getElementById('root')
);