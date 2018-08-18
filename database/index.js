const pg = require('pg');
const cache = require('./vacation-me-cache');

const pool = new pg.Pool();

pool.on('error', function(err) {
  pool.end();
  console.log('There was a error with pg', err);
  process.exit(-1);
});

module.exports = pool;

pool.connectAndEnd = function(action) {
  return pool.connect().then(function(client) {
    return action(client)
      .then(function(res) {
        console.log('done with action');
        client.release();
        // done(null, res.rows);
        return Promise.resolve(res);
      })
      .catch(function(err) {
        client.release();
        return Promise.reject(err);
      });
  });
};

pool.Detail = require('./Detail');
