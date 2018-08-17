/*
 * Details schema and logic
*/

const db = require('./index');
const Detail = (module.exports = {});

const connect = function(action) {
  return db.connect().then(function(client) {
    return action(client)
      .then(function(res) {
        console.log('done with action');
        client.release();
        // done(null, res.rows);
        return Promise.resolve(res);
      })
      .catch(function(err) {
        client.release();
        console.log(err.stack);
      });
  });
};

Detail.getListing = function(listingid) {
  return connect(function(client) {
    var listings = client.query(`\
      SELECT l.*, t.name as listing_type_name, h.name as host_name, h.avatar as avatar FROM listings l
      INNER JOIN hosts h ON h.id = l.hostid
      INNER JOIN listing_types t ON t.id = l.typeid
      WHERE l.listingid = 22;`);

    var house_rules = client.query(
      `SELECT * FROM house_rules WHERE listingid=${listingid}`
    );

    var cancellation_policies = client.query(
      `SELECT * FROM cancellation_policies WHERE listingid=${listingid}`
    );

    var highlights = client.query(
      `SELECT * FROM highlights WHERE listingid=${listingid}`
    );

    return Promise.all([
      listings,
      house_rules,
      cancellation_policies,
      highlights
    ]);
  });
};
