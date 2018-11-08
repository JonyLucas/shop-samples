import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class PriceAndButton extends React.Component{
	render(){
		return (<div class='priceLine'>
					<span class='price'>{'R$ ' + this.props.value.toFixed(2)}</span><button>Add</button>
				</div>
		);
	}
}

class Product extends React.Component{
	render(){
		return (<div class='productItem'>
					<img class='productImage' src={this.props.src} alt={this.props.text} width='120'/>
					<span class='productName'>{this.props.name}</span>
					<PriceAndButton value={this.props.value}/>
				</div>
		);
	}
}

class ProductArea extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			products: props.products,
		};
	}

	generateProducts(){
		return this.state.products
				.map(element => <Product value={element.value} name={element.name} src={element.src} txt={element.txt}/>)
				.reduce( (prev, curr) => [prev, '\n', curr]);
	}

	render(){
		return ( <ul class='productArea'>
					{this.generateProducts()}
				</ul>
		);
	}
}

class CategoryList extends React.Component{

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

class BuyArea extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			categoryList: ['Televisores', 'Celulares', 'Tablets', 'Notebooks', 'Livros'],
			products: [
				{value:200, name:'Phisically Based Rendering 3rd edition', src:'bookcover.png', text:'Bookcover3'},
				{value:100, name:'Phisically Based Rendering 2nd edition', src:'bookcover.png', text:'Bookcover2'},
			]
		};
	}

	render(){
		return (<div class='buyArea'>
					<CategoryList categoryList={this.state.categoryList}/>
					<ProductArea products={this.state.products}/>
				</div>
		);
	}
}

class NavBar extends React.Component{
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

class Cart extends React.Component{
	render(){
		return (<div class='priceLine'>
					<span class='price'>{'R$ ' + this.props.value.toFixed(2)}</span><button>Carrinho</button>
				</div>
		);
	}
}

class HeadBar extends React.Component{
	render(){
		return (<div class='navPath'>
					<NavBar pathList={['Home', 'Categoria']}/>
					<Cart value={300}/>
				</div>
		);
	}
}

class MainPage extends React.Component{
	render(){
		return (<div class='mainPage'>
					<HeadBar />
					<BuyArea />
				</div>
		);
	}
}

ReactDOM.render(
	<MainPage />,
	document.getElementById('root')
);
 
