var helpers = require('./helpers');

var headers = Object.keys(new helpers.generateCancellationPolicy());

console.log(helpers.makeCSV(headers));

for (let listingId = 1; listingId <= 2500000; listingId++) {
  for (let cp = 1; cp < helpers.MAX_CANCELLATION_POLICYS; cp++) {
    let data = new helpers.generateCancellationPolicy(cp, listingId);
    console.log(helpers.makeCSV(headers, data));
  }
}
