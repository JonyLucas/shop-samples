const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Allows the routes to throw errors
require('express-async-errors');

const constants = require('./config/constants');
const database = require('./database');
const ProductController = require('./controllers/product');

const app = express()
  .use(bodyParser.json({ limit: '5mb' }))
  .use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
  .use(express.static(path.join(__dirname, 'public')))

  // Routes
  .use('/api/product', ProductController);

exports.app = app;
exports.listenAsync = async () => {
  console.log('Starting the app');

  await database.connect();

  const port = process.env.PORT || constants.port;

  return new Promise((resolve, reject) => {
    console.log('Connecting the server');

    const server = app.listen(port, (error) => {
      if (error) {
        console.log('Server error', error);
        reject(error);
      } else {
        console.log('Server listening on port', port);
        resolve(server);
      }
    });
  });
};