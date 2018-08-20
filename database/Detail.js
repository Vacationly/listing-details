/*
 * Details schema and logic
*/

const db = require('./index');
const cache = require('./vacation-me-cache');
const Detail = (module.exports = {});
const promise = require('bluebird');

Detail.getListing = function(listingid) {
  return cache.getListingCache(listingid).then(function(cacheData) {
    // console.log('there is cacheData: ', !!cacheData, cacheData);
    return cacheData
      ? promise.resolve(cacheData)
      : _getListingFromDatabase(listingid);
  });
};

const formatListing = function(data) {
  // console.log(data);
  var listing = data[0].rows[0];

  listing.houseRules = data[1].rows;
  listing.cancellationPolicy = data[2].rows;
  listing.highlights = data[3].rows;

  cache.setListingCache(listing.listingid, 3600, listing, function(
    err,
    result
  ) {
    if (err) {
      console.log(err);
    }
  });

  return promise.resolve(listing);
};

const _getListingFromDatabase = function(listingid) {
  console.log('save cache to redis');
  return db.connectAndEnd(function(client) {
    var listings = query(
      client,
      `\
    SELECT l.*, t.name as listing_type_name, h.name as host_name, h.avatar as avatar FROM listings l
    INNER JOIN hosts h ON h.id = l.hostid
    INNER JOIN listing_types t ON t.id = l.typeid
    WHERE l.listingid = ${listingid};`
    );

    var house_rules = query(
      client,
      `SELECT * FROM house_rules WHERE listingid=${listingid}`
    );

    var cancellation_policies = query(
      client,
      `SELECT * FROM cancellation_policies WHERE listingid=${listingid}`
    );

    var highlights = query(
      client,
      `SELECT * FROM highlights WHERE listingid=${listingid}`
    );

    var promises = [listings, house_rules, cancellation_policies, highlights];

    return promise.all(promises).then(formatListing);
  });
};

function query(client, query) {
  return new promise(function(resolve, reject) {
    client.query(query, function(err, results) {
      err ? reject(err) : resolve(results);
    });
  });
}
