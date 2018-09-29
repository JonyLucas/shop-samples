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

  async updateById(id, data) {
    const joinedData = this.parseSet(data);
    const updated = await this.set(`id = ${id}`, joinedData, { limit: 1 });
    return updated === 1;
  }

  async deleteById(id) {
    const deleted = await this.delete(`id = ${id}`, { limit: 1 });
    return deleted === 1;
  }
}

module.exports = new Category();
