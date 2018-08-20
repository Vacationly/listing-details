var redis = require('redis'),
  client = redis.createClient();
// const lru = require('redis-lru');

redis.debug = true;

client.on('error', function(err) {
  console.log('Error ' + err);
});

// const listingsCache = lru(client, { max: 1000, namespace: 'listings' });

// module.exports = listingsCache;

module.exports = {
  getListingCache: getListingCache,
  setListingCache: setListingCache
};

function getListingCache(key, next) {
  return new Promise(function(resolve, reject) {
    client.get('postgres:' + key, function(err, result) {
      // console.log(err, result);
      if (err) return reject(err);
      return resolve(result && JSON.parse(result));
    });
  });
}

function setListingCache(key, ttl, data, next) {
  return new Promise(function(resolve, reject) {
    // console.log(key);
    client.setex('postgres:' + key, ttl, JSON.stringify(data), function(
      err,
      result
    ) {
      if (err) return next(err);
      return resolve(result);
    });
  });
}
