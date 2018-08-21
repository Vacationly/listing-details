const pg = require('pg');
const cache = require('./vacation-me-cache');
const promise = require('bluebird');

const pool = new pg.Pool();

pool.on('error', function(err) {
  pool.end();
  console.log('There was a error with pg', err);
  process.exit(-1);
});

module.exports = pool;

pool.connectAndEnd = function(action) {
  return pool.connect(function(err, client) {
    return action(client)
      .then(function(res) {
        client.release();
        return promise.resolve(res);
      })
      .catch(function(err) {
        client.release();
        return promise.reject(err);
      });
  });
};

pool.Detail = require('./Detail');
