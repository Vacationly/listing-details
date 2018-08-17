var helpers = require('./helpers');

var headers = Object.keys(new helpers.generateListingType());

console.log(helpers.makeCSV(headers));

for (let i = 1; i <= helpers.MAX_TYPES; i++) {
  var data = new helpers.generateListingType(i);

  console.log(helpers.makeCSV(headers, data));
}
