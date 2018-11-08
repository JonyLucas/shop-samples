import React from 'react';
import ReactDOM from 'react-dom';
import './product.css';

import {CategoryList, HeadBar} from './extra.js'

class ItemArea extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			product: props.product,
		};
	}

	render(){
		return ( <div class='productArea'>
					<img class='productImage' src={this.props.src} alt={this.props.alt} width='300'/>
					<div class='productName'>{this.props.name}</div>
					<div class='bigPrice'>{'R$ ' + this.props.value.toFixed(2)}</div>
					<button class='bigButton'>Add</button>
					<div class='desc'>Este preoduto é maravilhoso. Você deve comprar este produto lindo e legal para sua casa mesmo que não precise. Este preoduto é maravilhoso. Você deve comprar este produto lindo e legal para sua casa mesmo que não precise. Este preoduto é maravilhoso. Você deve comprar este produto lindo e legal para sua casa mesmo que não precise.</div>
				</div>
		);
	}
}

class BuyArea extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			categoryList: ['Televisores', 'Celulares', 'Tablets', 'Notebooks', 'Livros'],
			product: {value:200, name:'Phisically Based Rendering 3rd edition', src:'bookcover.png', text:'Bookcover3'},
		};
	}

	render(){
		return (<div class='buyArea'>
					<CategoryList categoryList={this.state.categoryList}/>
					<ItemArea name={this.state.product.name} value={this.state.product.value}
							  src={this.state.product.src} alt={this.state.product.alt}/>
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
 
