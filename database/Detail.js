/*
 * Details schema and logic
*/

const db = require('./index');
const cache = require('./vacation-me-cache');
const Detail = (module.exports = {});

Detail.getListing = function(listingid) {
  return cache.getOrSet(listingid, function() {
    console.log(listingid, 'no cache saved must get from database');
    return _getListingFromDatabase(listingid);
  });
};

const formatListing = function(data) {
  var listing = data[0].rows[0];

  listing.houseRules = data[1].rows;
  listing.cancellationPolicies = data[2].rows;
  listing.highlights = data[3].rows;

  return Promise.resolve(listing);
};

const _getListingFromDatabase = function(listingid) {
  return db.connectAndEnd(function(client) {
    var listings = client.query(`\
    SELECT l.*, t.name as listing_type_name, h.name as host_name, h.avatar as avatar FROM listings l
    INNER JOIN hosts h ON h.id = l.hostid
    INNER JOIN listing_types t ON t.id = l.typeid
    WHERE l.listingid = ${listingid};`);

    var house_rules = client.query(
      `SELECT * FROM house_rules WHERE listingid=${listingid}`
    );

    var cancellation_policies = client.query(
      `SELECT * FROM cancellation_policies WHERE listingid=${listingid}`
    );

    var highlights = client.query(
      `SELECT * FROM highlights WHERE listingid=${listingid}`
    );

    var promises = [listings, house_rules, cancellation_policies, highlights];

    return Promise.all(promises).then(formatListing);
  });
};
