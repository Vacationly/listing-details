var helpers = require('./helpers');

var headers = Object.keys(new helpers.generateAmenity());

console.log(helpers.makeCSV(headers));

for (let i = 1; i <= helpers.MAX_AMENITIES; i++) {
  var data = new helpers.generateAmenity(i);

  console.log(helpers.makeCSV(headers, data));
}
