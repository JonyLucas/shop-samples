const database = require('../src/database');

before(() => database.connect());
after(() => database.disconnect());
