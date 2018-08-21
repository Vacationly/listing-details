const promise = require('bluebird');
const redis = promise.promisifyAll(require('redis'));

const client = redis.createClient({
  host: process.env.REDIS_URI || 'localhost'
});

redis.debug = true;

client.on('error', function(err) {
  console.log('Error ' + err);
});

module.exports = {
  getListingCache: getListingCache,
  setListingCache: setListingCache
};

function getListingCache(key) {
  return client.getAsync('postgres:' + key);
}

function setListingCache(key, ttl, data, cb) {
  process.nextTick(function() {
    client.setex('postgres:' + key, ttl, JSON.stringify(data), cb);
  });
}
