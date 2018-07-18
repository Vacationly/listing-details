const db = require('../index.js');
const dataGenerator = require('./dataGenerator.js');

const initializeData = function() {
  let data = dataGenerator.generateData();
  Object.values(db).forEach((schema, index) => {
    schema
      .find({})
      .remove()
      .exec()
      .then(schema.insertMany(data[index]));
  });
};

initializeData();
