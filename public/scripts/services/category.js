const CategoryService = (() => {

  function create(data) {
    return new Promise((resolve) => {
      console.log('create', data);
      $.post(`/api/category`, data, ({ categories }) => resolve(categories));
    });
  }

  function findById(id) {
    return new Promise((resolve) => {
      $.get(`/api/category/${id}`, ({ category }) => resolve(category));
    });
  }

  function find() {
    return new Promise((resolve) => {
      $.get('/api/category', ({ categories }) => resolve(categories));
    });
  }

  function update(id, data) {
    return new Promise((success) => {
      $.ajax({
        url: `/api/category/${id}`,
        type: 'PUT',
        data,
        success,
      });
    });
  }

  function remove(id) {
    return new Promise((success) => {
      $.ajax({
        url: `/api/category/${id}`,
        type: 'DELETE',
        success,
      });
    });
  }

  return { create, findById, find, update, remove };

})();
