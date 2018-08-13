var helpers = require('./helpers');

var headers = Object.keys(new helpers.generateHouseRules());

console.log(helpers.makeCSV(headers));

for (let listingId = 2500000; listingId < 5000000; listingId++) {
  for (let hr = 1; hr < helpers.MAX_HOUSE_RULES; hr++) {
    let data = new helpers.generateHouseRules(hr, listingId);
    console.log(helpers.makeCSV(headers, data));
  }
}
