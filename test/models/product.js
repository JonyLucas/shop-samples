const expect = require('chai').expect;
const Product = require('../../src/models/product');
const Category = require('../../src/models/category');
require('../index');

function createProduct(name, category = null) {
  return Product.create({
    name: name || Math.random().toString(),
    price: Math.random(),
    category,
  });
}

describe('Model', () => {
  before(async () => {
    await Product.clear();
    await Category.clear();
  });

  afterEach(async () => {
    await Product.clear();
    await Category.clear();
  });

  it('should find products by category id', async () => {
    const books = await Category.create({ name: 'books' });
    const games = await Category.create({ name: 'games' });

    const withoutCategory = await createProduct('no category');
    const aBook = await createProduct('a book', books);
    const aGame = await createProduct('a game', games);
    const anotherGame = await createProduct('another game', games);
    
    const booksResult = await Product.find({ category: books });
    expect(booksResult).to.be.an('array').that.has.length(1);
    expect(booksResult[0].name).to.equal('a book');
    
    const gamesResult = await Product.find({ category: games });
    expect(gamesResult).to.be.an('array').that.has.length(2);
    expect(gamesResult.map(({ name }) => name))
      .to.have.members(['a game', 'another game']);
  });

  it('should find products by category name', async () => {
    const books = await Category.create({ name: 'books' });
    const games = await Category.create({ name: 'games' });

    const withoutCategory = await createProduct('no category');
    const aBook = await createProduct('a book', books);
    const aGame = await createProduct('a game', games);
    const anotherGame = await createProduct('another game', games);
    
    const booksResult = await Product.findByCategory('books');
    expect(booksResult).to.be.an('array').that.has.length(1);
    expect(booksResult[0].name).to.equal('a book');
    
    const gamesResult = await Product.findByCategory('games');
    expect(gamesResult).to.be.an('array').that.has.length(2);
    expect(gamesResult.map(({ name }) => name))
      .to.have.members(['a game', 'another game']);
  });
});
