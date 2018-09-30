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

  parseValue(value) {
    if (value === null || value === undefined) {
      return 'NULL';
    }
  
    if (typeof value === 'boolean') {
      return value ? '1' : '0';
    }
  
    return `'${value}'`;
  }

  joinValues(data, separator = ', ') {
    return this.filterAttributes(data)
      .filter(key => data[key] !== undefined)
      .map(key => this.parseValue(data[key]))
      .join(separator);
  }
    
  joinData(data, separator = ', ') {
    return this.filterAttributes(data)
      .filter(key => data[key] !== undefined)
      .map(key => `${key} = ${this.parseValue(data[key])}`)
      .join(separator);
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

  async set(query, data, options) {
    const joinedOptions = this.parseOptions(options);
    const sql = `
      UPDATE ${this.name}
      SET ${data}
      WHERE ${query}
      ${joinedOptions};`;

      const result = await this.query(sql);
      return result.affectedRows;
  }

  async delete(query, options) {
    const joinedOptions = this.parseOptions(options);
    const sql = `
      DELETE FROM ${this.name}
      WHERE ${query}
      ${joinedOptions};`;

    const result = await this.query(sql);
    return result.affectedRows;
  }

  clear() {
    return this.query(`DELETE FROM ${this.name} WHERE 1 = 1;`);
  }
}
