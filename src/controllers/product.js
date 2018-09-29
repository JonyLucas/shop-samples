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
   */
  .post('/', async (req, res) => {
    console.log('POST /api/product', req.body);

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
   */
  .get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json({ products });
  });
