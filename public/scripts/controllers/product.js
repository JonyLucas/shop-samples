$(document).ready(() => {
  ProductController.init();
});

const ProductController = (() => {

  function init() {
    fetchCategories();

    const productId = getUrlQuery().id;
    if (productId) {
      fetchProduct(productId);
    }
  }

  function getUrlQuery() {
    const query = [];
    const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
    for(let i = 0; i < hashes.length; i++) {
      const hash = hashes[i].split('=');
      query.push(hash[0]);
      query[hash[0]] = hash[1];
    }
  
    return query;
  }
  
  async function fetchCategories() {
    const container = $('#product-category');
    container.empty();
    
    const categories = await CategoryService.find();
    categories.forEach((category) => {
      const option = $(document.createElement('option'))
        .attr('value', category.id)
        .text(category.name);
      container.append(option);
    });
  }
  
  async function fetchProduct(productId) {
    const product = await ProductService.findById(productId);
  
    if (!product) {
      window.location.replace('/notfound.html');
    }
  
    $('#product-name').val(product.name);
    $('#product-price').val(product.price);
    $('#product-category').val(product.category);
    $('#product-create')
      .text('Edit')
      .attr('onclick', `javascript: ProductController.saveProduct(${productId})`);
  }
  
  async function createProduct() {
    const data = {
      name: $('#product-name').val(),
      price: $('#product-price').val(),
      category: $('#product-category').val(),
    };
  
    await ProductService.create(data);
    window.location.href = '/';
  }
  
  async function saveProduct(id) {
    const data = {
      name: $('#product-name').val(),
      price: $('#product-price').val(),
      category: $('#product-category').val(),
    };
  
    await ProductService.update(id, data);
    window.location.href = '/';
  }

  return { init, createProduct, saveProduct }

})();
