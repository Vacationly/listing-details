const db = require('../index.js');
const dataGenerator = require('./dataGenerator.js');

const initializeData = function () {
  const data = dataGenerator.generateData();
  const processes = [];
  Object.keys(db).forEach((model) => {
    processes.push(
      db[model]
        .find({})
        .remove()
        .exec()
        .then(() => db[model].insertMany(data[model]))
        .catch((err) => {
          console.log(`Error initializing data for ${model}, ${err}`);
          process.exit(-1);
        }),
    );
  });
  Promise.all(processes).then(() => process.exit(0));
};

initializeData();
