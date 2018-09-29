const Router = require('express').Router;
const Category = require('../models/category');
const { ApiError, codes } = require('../errors');

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
   * 
   * @apiSuccess (200) {Number} id The id.
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
   * 
   * @apiSuccess (200) {Object} category The category data.
   * @apiSuccess (200) {Number} category.id The id.
   * @apiSuccess (200) {String} category.name The name.
   * @apiSuccess (200) {String} category.timestamp The creation date.
   */
  .get('/', async (req, res) => {
    const categories = await Category.findAll();
    res.json({ categories });
  })

  /**
   * @api {put} /category Update category
   * @apiGroup Category
   * @apiVersion 1.0.0
   * @apiDescription Updates a category.
   * 
   * @apiSuccess (200) {Object[]} categories The categories list.
   * @apiSuccess (200) {Number} categories.id The id.
   * @apiSuccess (200) {String} categories.name The name.
   * @apiSuccess (200) {String} categories.timestamp The creation date.
   */
  .put('/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await Category.udpate(id, req.body);
    
    if (!updated) {
      throw new ApiError('Category not found.', codes.client.NOT_FOUND);
    }

    res.send('Category updated.');
  })

  /**
   * @api {delete} /category Delete category
   * @apiGroup Category
   * @apiVersion 1.0.0
   * @apiDescription Deletes a category.
   */
  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleted = await Category.delete(id);

    if (deleted) {
      res.send('Category deleted.');
    } else {
      res.send('Category not found.');
    }
  });
