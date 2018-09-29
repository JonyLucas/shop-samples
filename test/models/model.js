const expect = require('chai').expect;
const Model = require('../../src/models/model');
require('../index');

const model = new Model('test', ['id', 'required', 'optional', 'timestamp']);

describe('Model', () => {
  before(async () => {
    await model.clear();
  });

  afterEach(async () => {
    await model.clear();
  });

  it('should create a test row', async () => {
    const attributes = ['`required`', '`optional`'].join(', ');
    const values = ['value 0', 'value 1'].map(x => `'${x}'`).join(', ');
    const id = await model.insert(attributes, values);

    expect(id).to.be.a('number').that.is.greaterThan(0);
  });

  it('should find a test row', async () => {
    const attributes = ['`required`', '`optional`'].join(', ');
    const values = ['value 0', 'value 1'].map(x => `'${x}'`).join(', ');
    const id = await model.insert(attributes, values);

    const query = `required = 'value 0'`;
    const result = (await model.select(query))[0];

    expect(result.required).to.equal('value 0');
    expect(result.optional).to.equal('value 1');
  });

  it('should update a test row', async () => {
    const attributes = ['`required`', '`optional`'].join(', ');
    const values = ['value 0', 'value 1'].map(x => `'${x}'`).join(', ');
    const id = await model.insert(attributes, values);
    const query = `required = 'value 0'`;

    const updateResult = await model.set(query, `optional = 'value 1'`);
    expect(updateResult).to.equal(1);

    const findResult = (await model.select(query))[0];
    expect(findResult.optional).to.equal('value 1');
  });

  it('should delete a test row', async () => {
    const attributes = ['`required`', '`optional`'].join(', ');
    const values = ['value 0', 'value 1'].map(x => `'${x}'`).join(', ');
    const id = await model.insert(attributes, values);
    const query = `required = 'value 0'`;

    const deleteResult = await model.delete(query);
    expect(deleteResult).to.equal(1);

    const findResult = (await model.select(query))[0];
    expect(findResult).to.not.exist;
  });
});
