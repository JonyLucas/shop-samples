$(document).ready(() => {
  CategoryController.init();
});

const CategoryController = (() => {

  function init() {
    const categoryId = getUrlQuery().id;
    if (categoryId) {
      fetch(categoryId);
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
  
  async function fetch(categoryId) {
    const category = await CategoryService.findById(categoryId);
  
    if (!category) {
      window.location.replace('/notfound.html');
    }
  
    $('#category-name').val(category.name);
    $('#category-create')
      .text('Edit')
      .attr('onclick', `javascript: CategoryController.save(${categoryId})`);
  }
  
  async function create() {
    const data = { name: $('#category-name').val() };
    console.log('to save', data);
    await CategoryService.create(data);
    window.location.href = '/';
  }
  
  async function save(id) {
    const data = { name: $('#category-name').val() };
    await CategoryService.update(id, data);
    window.location.href = '/';
  }

  return { init, create, save }

})();
