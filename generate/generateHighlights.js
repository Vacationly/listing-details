var helpers = require('./helpers');

var headers = Object.keys(new helpers.generateHighlights());

console.log(helpers.makeCSV(headers));

for (let listingId = 2500000; listingId < 5000000; listingId++) {
  for (let hl = 1; hl < helpers.MAX_HIGHLIGHTS; hl++) {
    let data = new helpers.generateHighlights(hl, listingId);
    console.log(helpers.makeCSV(headers, data));
  }
}
