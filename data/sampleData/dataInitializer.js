const db = require('../index.js');
const dataGenerator = require('./dataGenerator.js');

const initializeData = function() {
  let data = dataGenerator.generateData();
  let processes = [];
  Object.keys(db).forEach(schema => {
    processes.push(
      db[schema]
        .find({})
        .remove()
        .exec()
        .then(() => db[schema].insertMany(data[schema]))
        .catch(() => {
          console.log(`Error initializing data for ${schema}`);
          process.exit(-1);
        })
    );
  });
  Promise.all(processes).then(results => process.exit(0));
};

initializeData();
