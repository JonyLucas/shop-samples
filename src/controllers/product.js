const Router = require('express').Router;
const Product = require('../models/product');

module.exports = Router()

/**
   * @api {post} /product Create product
   * @apiGroup Product
   * @apiVersion 1.0.0
   * @apiDescription Creates a product.
   *
   * @apiParam {String} name The name.
   * @apiParam {Number} password The price.
   * 
   * @apiSuccess (200) {Number} id The id.
   */
  .post('/', async (req, res) => {
    const id = await Product.create(req.body);
    res.json({ id });
  })

  /**
   * @api {get} /product/:id Get product
   * @apiGroup Product
   * @apiVersion 1.0.0
   * @apiDescription Finds a product by the ID.
   *
   * @apiParam {Number} id The product ID.
   * 
   * @apiSuccess (200) {Object} product The product data.
   * @apiSuccess (200) {Number} product.id The id.
   * @apiSuccess (200) {String} product.name The name.
   * @apiSuccess (200) {Number} product.price The price.
   * @apiSuccess (200) {String} product.timestamp The creation date.
   */
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json({ product });
  })

  /**
   * @api {get} /product Get products
   * @apiGroup Product
   * @apiVersion 1.0.0
   * @apiDescription Finds all products.
   * 
   * @apiSuccess (200) {Object[]} products The products list.
   * @apiSuccess (200) {Number} products.id The id.
   * @apiSuccess (200) {String} products.name The name.
   * @apiSuccess (200) {Number} products.price The price.
   * @apiSuccess (200) {String} products.timestamp The creation date.
   */
  .get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json({ products });
  })

  /**
   * @api {put} /product Update product
   * @apiGroup Product
   * @apiVersion 1.0.0
   * @apiDescription Updates a product.
   */
  .put('/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await Product.updateById(id, req.body);
    
    if (!updated) {
      throw new ApiError('Product not found.', codes.client.NOT_FOUND);
    }

    res.send('Product updated.');
  })

  /**
   * @api {delete} /product Delete product
   * @apiGroup Product
   * @apiVersion 1.0.0
   * @apiDescription Deletes a product.
   */
  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleted = await Product.deleteById(id);

    if (deleted) {
      res.send('Product deleted.');
    } else {
      res.send('Product not found.');
    }
  });
