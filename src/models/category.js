const database = require('../database');
const Model = require('./model');

class Category extends Model {
  constructor() {
    super('category', ['id', 'name', 'timestamp']);
  }

  create({ name }) {
    return this.insert('name', name);
  }

  async findById(id, projection = '*') {
    const categories = await this.select(`id = ${id}`, projection, { limit: 1 });
    return categories[0] || null;
  }

  findAll(projection = '*', options = {}) {
    return this.select(null, projection, options);
  }
}

module.exports = new Category();
