const Router = require('express').Router;
const Category = require('../models/category');

module.exports = Router()

/**
   * @api {post} /category Create category
   * @apiGroup Category
   * @apiVersion 1.0.0
   * @apiDescription Creates a category.
   *
   * @apiParam {String} name The name.
   * @apiParam {Number} password The price.
   */
  .post('/', async (req, res) => {
    console.log('POST /api/category', req.body);

    const id = await Category.create(req.body);
    res.json({ id });
  })

  /**
   * @apiGroup Category
   * @api {get} /category/:id Get category
   * @apiVersion 1.0.0
   * @apiDescription Finds a category by the ID.
   *
   * @apiParam {Number} id The category ID.
   */
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.json({ category });
  })

  /**
   * @api {get} /category Get categories
   * @apiGroup Category
   * @apiVersion 1.0.0
   * @apiDescription Finds all categories.
   */
  .get('/', async (req, res) => {
    const categories = await Category.findAll();
    res.json({ categories });
  });
