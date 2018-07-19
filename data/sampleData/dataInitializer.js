const db = require('../index.js');
const dataGenerator = require('./dataGenerator.js');

const initializeData = function () {
  const data = dataGenerator.generateData();
  const processes = [];
  Object.keys(db.models).forEach((model) => {
    processes.push(
      db.models[model]
        .find({})
        .remove()
        .exec()
        .then(() => db.models[model].insertMany(data[model]))
        .catch((err) => {
          console.log(`Error initializing data for ${model}, ${err}`);
          process.exit(-1);
        }),
    );
  });
  Promise.all(processes).then(() => process.exit(0));
};

initializeData();
