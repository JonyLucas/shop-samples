$(document).ready(() => {
  MainController.init();
});

const MainController = (() => {
  
  function init() {
    fetchCategories();
    fetchProducts();
  }

  function createCategoryElement(name, id) {
    const a = $(document.createElement('a'))
      .text(name)
      .attr('href', `javascript: MainController.fetchProducts(${id})`);
  
    return $(document.createElement('li')).append(a);
  }
  
  async function fetchCategories() {
    const categories = await CategoryService.find();
    const container = $('#categories');
  
    container.empty();
    container.append(createCategoryElement('All'));
  
    categories.forEach((category) => {
      container.append(createCategoryElement(category.name, category.id));
    });
  }
  
  async function fetchProducts(categoryId) {
    const products = await ProductService.find(categoryId);
    const container = $('#products');
  
    container.empty(); 
  
    products.forEach((product) => {
      const tr = $(document.createElement('tr'));
  
      tr.append($(document.createElement('td')).text(product.id));
      tr.append($(document.createElement('td')).text(product.name));
      tr.append($(document.createElement('td')).text(product.price));
  
      const actions = $(document.createElement('span'));
      actions.append($(document.createElement('a'))
        .text('edit')
        .attr('href', `/product.html?id=${product.id}`));
      actions.append(' ');
      actions.append($(document.createElement('a'))
        .text('delete')
        .attr('href', `javascript: MainController.removeProduct(${product.id})`));
  
      tr.append(actions);
      container.append(tr);
    });
  }
  
  async function removeProduct(id) {
    await ProductService.remove(id);
    fetchProducts();
  }

  return { init, fetchProducts, removeProduct };

})();
