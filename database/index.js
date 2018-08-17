const pg = require('pg');

const pool = new pg.Pool();

pool.on('error', function(err) {
  pool.end();
  console.log('There was a error with pg', err);
  process.exit(-1);
});

module.exports = pool;

pool.Detail = require('./Detail');
