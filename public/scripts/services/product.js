const ProductService = (() => {

  function create(data) {
    return new Promise((resolve) => {
      $.post(`/api/product`, data, ({ products }) => resolve(products));
    });
  }

  function findById(id) {
    return new Promise((resolve) => {
      $.get(`/api/product/${id}`, ({ product }) => resolve(product));
    });
  }

  function find(categoryId) {
    const query = categoryId !== undefined ? `category=${categoryId}` : '';

    return new Promise((resolve) => {
      $.get(`/api/product?${query}`, ({ products }) => resolve(products));
    });
  }

  function update(id, data) {
    return new Promise((success) => {
      $.ajax({
        url: `/api/product/${id}`,
        type: 'PUT',
        data,
        success,
      });
    });
  }

  function remove(id) {
    return new Promise((success) => {
      $.ajax({
        url: `/api/product/${id}`,
        type: 'DELETE',
        success,
      });
    });
  }

  return { create, findById, find, update, remove };

})();
