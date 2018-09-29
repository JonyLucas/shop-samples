const database = require('../database');

module.exports = class Model {
  constructor(name, fields) {
    this.name = name;
    this.fields = new Set(fields);
  }

  query(sql) {
    console.log('Query:', sql.trim().replace(/\s{2,}/g, ' '));

    return new Promise((resolve, reject) => {
      database.connection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  filterAttributes(attributes) {
    if (typeof attributes === 'object') {
      if (Array.isArray(attributes)) {
        return attributes.filter(key => this.fields.has(key));
      } else {
        return this.filterAttributes(Object.keys(attributes));
      }
    }

    return [];
  }

  parseValues(data, separator = ', ') {
    const attributes = this.filterAttributes(data);
    return attributes.map(key => `'${data[key]}'`).join(separator);
  }

  parseOptions(options = {}) {
    const optionsList = [];

    if (typeof options.limit === 'number') {
      optionsList.push(`LIMIT ${options.limit}`);
    }

    return optionsList.join(' ');
  }

  async insert(attributes, data) {
    const sql = `
      INSERT INTO ${this.name} (${attributes})
      VALUES (${data});`;

    return (await this.query(sql)).insertId;
  }

  select(query, projection = '*', options) {
    const attributesToQuery = Array.isArray(projection) ? this.filterAttributes(projection).join(' ') : projection;
    const joinedOptions = this.parseOptions(options);
    const sql = `
      SELECT ${attributesToQuery || '*'}
      FROM ${this.name}
      WHERE ${query || '1 = 1'}
      ${joinedOptions};`;

    return this.query(sql);
  }

  set(query, data, options) {
    const joinedOptions = this.parseOptions(options);
    const sql = `
      UPDATE ${this.name}
      SET ${data}
      WHERE ${query}
      ${joinedOptions};`;

    return this.query(sql);
  }

  delete(query, options) {
    const joinedOptions = this.parseOptions(options);
    const sql = `
      DELETE FROM ${this.name}
      WHERE ${query}
      ${joinedOptions};`;

    return this.query(sql);
  }

  clear() {
    return this.query(`DELETE FROM ${this.name} WHERE 1 = 1;`);
  }
}
