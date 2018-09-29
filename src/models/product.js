const database = require('../database');
const Model = require('./model');

class Product extends Model {
  constructor() {
    super('product', ['id', 'name', 'price', 'category', 'timestamp']);
  }

  create(data) {
    const joinedAttributes = this.filterAttributes(data).join(', ');
    const joinedData = this.parseValues(data);
    return this.insert(joinedAttributes, joinedData);
  }

  async findById(id, projection = '*') {
    const products = await this.select(`id = ${id}`, projection, { limit: 1 });
    return products[0] || null;
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

module.exports = new Product();
