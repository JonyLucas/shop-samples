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
	render(){
		return (<div class='productArea'>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
					<Product value={200} name='Phisically Based Rendering 3rd edition' src='bookcover.png' text='Bookcover'/>
				</div>
		);
	}
}

class ProductList extends React.Component{
	render(){
		return ( <ul class='productList'>
					<li>Televisores</li>
					<li>Celulares</li>
					<li>Tablets</li>
					<li>Notebooks</li>
					<li>Livros</li>
				</ul>
		);
	}
}

class BuyArea extends React.Component{
	render(){
		return (<div class='buyArea'>
					<ProductList/>
					<ProductArea/>
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
 
