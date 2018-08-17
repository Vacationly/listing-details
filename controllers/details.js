/*
 * Details Contol
*/
const db = require('../database/');
const path = require('path');

const ctrl = (module.exports = {});

ctrl.show = function(req, res) {
  const { listingId } = req.params;
  // model.getListingDetails(listingId, (err, results) => {
  //   if (err) console.log(err);
  //   res.statusCode = err ? 400 : 200;
  //   res.send(err || results);
  // });

  db.Detail.getListing(22).then(function(data) {
    var listing = data[0].rows[0];

    listing.houseRules = data[1].rows;
    listing.cancellationPolicies = data[2].rows;
    listing.highlights = data[3].rows;

    res.json(listing);
  });
};

ctrl.create = function(req, res) {
  const { listingId } = req.params;
  console.log('posting');
  // model.createListing(listingId, req.body, (err, result) => {
  //   if (err) console.log(err);
  //   res.statusCode = err ? 400 : 200;
  //   res.send(err || result);
  // });
};

ctrl.destroy = function(req, res) {
  const { listingId } = req.params;
  console.log('deleting');
  // model.deleteListing(listingId, (err, result) => {
  //   if (err) console.log(err);
  //   res.statusCode = err ? 400 : 200;
  //   res.send(err || result);
  // });
};

ctrl.update = function(req, res) {
  const { listingId, highlightId } = req.params;
  const { feedback } = req.body;
  // model.updateHighlightFeedback(
  //   listingId,
  //   highlightId,
  //   feedback,
  //   (err, results) => {
  //     if (err) console.log(err);
  //     res.statusCode = err ? 400 : 200;
  //     res.send(err || results);
  //   }
  // );
};
