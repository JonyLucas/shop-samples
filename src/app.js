const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// Allows the routes to throw errors
require('express-async-errors');
const constants = require('./config/constants');
const database = require('./database');
const { ApiError, codes } = require('./errors');
const ProductController = require('./controllers/product');
const CategoryController = require('./controllers/category');

const app = express()
  .use(bodyParser.json({ limit: '5mb' }))
  .use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
  .use(express.static(path.join(__dirname, 'public')))

  // Logging
  .use((req, res, next) => {
    const body = req.method === 'post' || req.method === 'put' ? JSON.stringify(req.body) : '';
    console.log('%s %s %s', req.method, req.url, body);
    next();
  })

  // Routes
  .use('/api/product', ProductController)
  .use('/api/category', CategoryController)

  // Not found
  .use((req, res, next) => {
    next(new ApiError('Not found.', codes.client.NOT_FOUND));
  })

  // Error handler
  .use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || codes.server.INTERNAL_SERVER_ERROR);
    res.send(`${error.name}: ${error.message}`);
    next();
  });

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