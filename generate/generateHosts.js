var helpers = require('./helpers');

var headers = Object.keys(new helpers.generateHost());

console.log(helpers.makeCSV(headers));

for (let i = 1; i <= helpers.MAX_HOSTS; i++) {
  var data = new helpers.generateHost(i);

  console.log(helpers.makeCSV(headers, data));
}
