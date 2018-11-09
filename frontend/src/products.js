import React from 'react';
import ReactDOM from 'react-dom';
import './products.css';

class UserForm extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {name: '',
					price: '',
					category: '',
				};
  
	  this.handleChangeName = this.handleChangeName.bind(this);
	  this.handleChangePrice = this.handleChangePrice.bind(this);
	  this.handleChangeCategory = this.handleChangeCategory.bind(this);
	  
	  this.handleSubmit = this.handleSubmit.bind(this);
	}
  
	handleChangeName(event) {
	  this.setState({login: event.target.value});
	}

	handleChangePrice(event) {
		this.setState({password: event.target.value});
	}

	handleChangeCategory(event) {
		this.setState({category: event.target.value});
	}
  
	handleSubmit(event) {
	  let data = {name: this.state.login, password: this.state.password, category: this.state.category};
	  // SEND USER DATA AND GET RESPONSE
	}
  
	render() {
	  return (
		<form onSubmit={this.handleSubmit}>
		  <label>
		  	<p>Nome</p>
			<input type="text" value={this.state.name} onChange={this.handleChangeName} />
			<p>Preço</p>
			<input type="text" value={this.state.price} onChange={this.handleChangePrice} />
			<p>Categoria</p>
			<input type="text" value={this.state.category} onChange={this.handleChangeCategory} />
		  </label>
		  <input type="submit" value="Cadastrar" />
		</form>
	  );
	}
  }

  ReactDOM.render(
	<UserForm />,
	document.getElementById('root')
);