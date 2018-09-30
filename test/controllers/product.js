const request = require('supertest');
const expect = require('chai').expect;
const Product = require('../../src/models/product');
const { app, listenAsync } = require('../../src/app');
require('../index');

const ROUTE = '/api/product';

describe('Controllers | Product', () => {
  let server = null;

  before(async () => {
    server = await listenAsync();
    await Product.clear();
  });

  afterEach(async () => {
    await Product.clear();
  });

  after(async () => {
    server.close();
  });

  it('should create a product', async () => {
    const { body } = await request(app)
      .post(ROUTE)
      .send({ name: 'name', price: 12.3 })
      .expect(200);

    expect(body.id).to.be.a('number').that.is.greaterThan(0);
  });

  it('should find a product by the ID', async () => {
    const data = {
      name: Math.random().toString(),
      price: parseFloat((Math.random() * 100).toString().match(/^\d+\.\d{2}/)[0]),
    };

    const id = await Product.create(data);
    const { body } = await request(app)
      .get(`${ROUTE}/${id}`)
      .expect(200);

    expect(body.product.id).to.equal(id);
    expect(body.product.name).to.equal(data.name);
    expect(body.product.price).to.equal(data.price);
  });

  it('should find all products', async () => {
    await Promise.all([1, 2, 3, 4].map(n => 
      Product.create({
        name: Math.random().toString(),
        price: parseFloat((Math.random() * 100).toString().match(/^\d+\.\d{2}/)[0]),
      })
    ));

    const { body } = await request(app)
      .get(`${ROUTE}`)
      .expect(200);

    expect(body.products).to.be.an('array').that.has.length(4);
  });

  it('should update a product by the ID', async () => {
    const id = await Product.create({
      name: Math.random().toString(),
      price: Math.random(),
    });

    await request(app)
      .put(`${ROUTE}/${id}`)
      .send({ name: 'new name' })
      .expect(200);

    const product = await Product.findById(id);
    expect(product.name).to.equal('new name');
  });

  it('should delete a product by the ID', async () => {
    const id = await Product.create({
      name: Math.random().toString(),
      price: Math.random(),
    });

    await request(app)
      .delete(`${ROUTE}/${id}`)
      .expect(200);

    const product = await Product.findById(id);
    expect(product).to.not.exist;
  });
});
