const mysql = require('mysql');
const constants = require('./config/constants');

class Database {
  connect() {
    if (this.connected) {
      console.log('Database already connected');
      return Promise.resolve();
    }

    this.connected = true;

    return new Promise((resolve, reject) => {
      console.log('Connecting the database');

      this.connection = mysql.createConnection({
        host: constants.database.address,
        user: 'mateus',
        database: constants.database.name
      });
      
      this.connection.connect((error) => {
        if (error) {
          reject(error);
        } else {
          console.log('Database connected');
          resolve();
        }
      });
    });
  }

  disconnect() {
    console.log('Disconnecting the database');
    this.connection.destroy();
    this.connected = false;
  }
}

module.exports = new Database();
