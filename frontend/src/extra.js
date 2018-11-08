import React from 'react';
import './index.css';

export class CategoryList extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			categoryList: props.categoryList,
		};
	}

	generateCategories(){
		return this.state.categoryList
				.map(element => <li>{element}</li>)
				.reduce( (prev, curr) => [prev, '\n', curr]);
	}

	render(){
		return ( <ul class='categoryList'>
					{this.generateCategories()}
				</ul>
		);
	}
}

export class NavBar extends React.Component{
	render(){
		let path = this.props.pathList;
		let finalPath = '';

		for(let i = 0; i < path.length; i++){
			finalPath += path[i] + ' > ';
		}

		return (<div class='navBar'>
					{finalPath}
				</div>
		);
	}
}

export class Cart extends React.Component{
	render(){
		return (<div class='priceLine'>
					<span class='price'>{'R$ ' + this.props.value.toFixed(2)}</span><button>Carrinho</button>
				</div>
		);
	}
}

export class HeadBar extends React.Component{
	render(){
		return (<div class='navPath'>
					<NavBar pathList={['Home', 'Categoria']}/>
					<Cart value={300}/>
				</div>
		);
	}
}