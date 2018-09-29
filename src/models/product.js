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

  // update(query, data, options) {
  //   const attributes = filterAttributes(data);
  //   const joinedQuery = attributes.map(key => `${key} = '${data[key]}'`).join(' && ');
  //   const joinedData = attributes.map(key => `${key} = '${data[key]}'`).join(', ');
  //   return this.set(joinedQuery, joinedData, options);
  // }
}

module.exports = new Product();
