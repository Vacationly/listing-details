/*
 * Details Contol
*/
const db = require('../database/');
const path = require('path');
const promise = require('bluebird');

const ctrl = (module.exports = {});

ctrl.show = function(req, res) {
  const { listingId } = req.params;

  db.Detail.getListing(listingId)
    .then(function(listing) {
      res.json(listing);
    })
    .catch(function(err) {
      console.log(err);
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
