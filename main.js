function Product(name, price, img_src){
	this.name = name;
	this.price = price;
	this.img_src = "./images/" + img_src;
}

let products = [
	new Product("How to Book", 20.00, "how-to-book-cover.jpg"),
	new Product("Architecture Book", 30.00, "architecture-book-cover.jpg"),
	new Product("Counting Thyme", 45.00, "countingthyme.jpg"),
	new Product("Enchantment", 10.00, "Enchantment-Book-Cover-Best-Seller1.jpg"),
	new Product("Red Planet", 50.00, "red-planet-cover.jpg")
]
let categories = ["Livros", "Eletrônicos", "Brinquedos", "Jogos", "Diversos"]
let cart_products = [];

let categories_menu = document.getElementById("categories");
let products_area = document.getElementById("products");
let cart = document.getElementById("cart");

categories_menu.innerHTML = categories.map(entry => "<li>" + entry + "</li>").join("\r\n");
displayAllProducts();

cart.innerHTML = "Carrinho de compras R$ " + cart_products.reduce(
	(prev, current) => prev + current.price, 0.0
);

Array.from(document.getElementsByClassName("img_thumb")).forEach( (value, index) => {
	value.onclick = (event) => {
		event.preventDefault();
		entry = products[index];
		products_area.innerHTML = createItem(entry);
	}
});

Array.from(document.getElementsByClassName("name_thumb")).forEach( (value, index) => {
	value.onclick = (event) => {
		event.preventDefault();
		entry = products[index];
		products_area.innerHTML = createItem(entry);
	}
});

Array.from(document.querySelectorAll("[button]")).forEach( element => {
	element.onclick = (e) => {
		e.preventDefault();
		if(element.getAttribute("button") === "home" || element.getAttribute("button") == "books"){
			displayAllProducts();
		}
	}
});

function displayAllProducts(){
	products_area.innerHTML = products.map(entry => {
		return '<span class="item">' + 
		'<a href="" class="img_thumb"><img src="' + entry.img_src + '" alt="' + entry.name + '" width=100px></a>' +
		'<a href="" class="name_thumb"><div class="title">' + entry.name + '</div></a>' +
		'<div class="price">R$ ' + entry.price.toFixed(2) + '</div></span>'
	}).join("");
}

function createItem(product){
	return '<span class="item">' + 
		   '<img src="' + product.img_src + '" alt="' + product.name + '" width=100px>' +
		   '<div class="title">' + product.name + '</div>' +
		   '<div class="price">R$ ' + product.price.toFixed(2) + '</div></span>';
}
