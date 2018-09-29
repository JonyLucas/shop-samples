const expect = require('chai').expect;
const Model = require('../../src/models/model');

const model = new Model('test', ['id', 'required', 'optional', 'timestamp']);

describe('Model', () => {
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
});
