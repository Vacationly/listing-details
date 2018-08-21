var helpers = require('./helpers');

var headers = Object.keys(new helpers.generateListing());

console.log(helpers.makeCSV(headers));

for (let i = 1; i <= helpers.MAX_LISTINGS; i++) {
  var data = new helpers.generateListing(i);

  console.log(helpers.makeCSV(headers, data));
}
