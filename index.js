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
		products_area.innerHTML = "";
		products_area.appendChild(createItem(entry));
	}
});

Array.from(document.getElementsByClassName("name_thumb")).forEach( (value, index) => {
	value.onclick = (event) => {
		event.preventDefault();
		entry = products[index];
		products_area.innerHTML = "";
		products_area.appendChild(createItem(entry));
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

	products_area.innerHTML = "";

	products.forEach(entry => {

		product_item = createItem(entry);
		products_area.appendChild(product_item);

	});
}

function createItem(product){

	product_item = document.createElement("span");
	product_item.setAttribute("class", "item");

	img_link = document.createElement("a");
	img_link.setAttribute("class", "img_thumb");
	img_link.setAttribute("href", "");

	image = document.createElement("img");
	image.setAttribute("src", product.img_src);
	image.setAttribute("alt", product.name);
	image.setAttribute("width", "100px");

	title_link = document.createElement("a");
	title_link.setAttribute("class", "name_thumb");
	title_link.setAttribute("href", "");

	title = document.createElement("div");
	title.setAttribute("class", "title");
	title.textContent = product.name;

	price = document.createElement("div");
	price.setAttribute("class", "price");
	price.textContent = "R$ " + product.price.toFixed(2);

	img_link.appendChild(image);
	title_link.appendChild(title);
	product_item.appendChild(img_link);
	product_item.appendChild(title_link);
	product_item.appendChild(price);

	return product_item;
}
