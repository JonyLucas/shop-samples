const CategoryService = (() => {

  function find() {
    return new Promise((resolve) => {
      $.get('/api/category', ({ categories }) => resolve(categories));
    });
  }

  return { find };

})();
