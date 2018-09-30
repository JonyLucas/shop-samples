const database = require('../database');
const Model = require('./model');

class Product extends Model {
  constructor() {
    super('product', ['id', 'name', 'price', 'category', 'timestamp']);
  }

  create(data) {
    const joinedAttributes = this.filterAttributes(data).join(', ');
    const joinedData = this.joinValues(data);
    return this.insert(joinedAttributes, joinedData);
  }

  async findById(id, projection = '*') {
    const products = await this.select(`id = ${id}`, projection, { limit: 1 });
    return products[0] || null;
  }
  
  findByCategory(category, projection = '*', options = {}) {
    return this.query(`
      SELECT p.*
      FROM ${this.name} as p
      JOIN category as c ON p.category = c.id
      WHERE c.name = ${this.parseValue(category)}`);
  }

  find(data = {}, projection = '*', options = {}) {
    const joinedData = this.joinData(data);
    return this.select(joinedData, projection, options);
  }

  async updateById(id, data) {
    const joinedData = this.joinData(data);
    const updated = await this.set(`id = ${id}`, joinedData, { limit: 1 });
    return updated === 1;
  }

  async deleteById(id) {
    const deleted = await this.delete(`id = ${id}`, { limit: 1 });
    return deleted === 1;
  }
}

module.exports = new Product();
