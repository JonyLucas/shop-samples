import React from 'react';
import ReactDOM from 'react-dom';
import './users.css';

class UserForm extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {name: ''};
  
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}
  
	handleChange(event) {
	  this.setState({name: event.target.value});
	}
  
	handleSubmit(event) {
	  let data = {name: this.state.name};
	  // SEND USER DATA AND GET RESPONSE
	}
  
	render() {
	  return (
		<form onSubmit={this.handleSubmit}>
		  <label>
		  	<p>Nome da Categoria</p>
			<input type="text" value={this.state.value} onChange={this.handleChange} />
		  </label>
		  <input type="submit" value="Criar" />
		</form>
	  );
	}
  }

  ReactDOM.render(
	<UserForm />,
	document.getElementById('root')
);