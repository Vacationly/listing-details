const express = require('express');
const path = require('path');
const ctrl = require('../controllers');

const router = express.Router();

router
  .route('/details/:listingId')
  .get(ctrl.details.show)
  .delete(ctrl.details.destroy);

router.post('/details', ctrl.details.create);

router.put('/details/:listingId/highlights/:highlightId', ctrl.details.update);

// router.get('/details/:listingId', (req, res) => {
//   const { listingId } = req.params;
//   model.getListingDetails(listingId, (err, results) => {
//     if (err) console.log(err);
//     res.statusCode = err ? 400 : 200;
//     res.send(err || results);
//   });
// });

// router.post('/details', (req, res) => {
//   const { listingId } = req.params;
//   console.log('posting');
//   model.createListing(listingId, req.body, (err, result) => {
//     if (err) console.log(err);
//     res.statusCode = err ? 400 : 200;
//     res.send(err || result);
//   });
// });

// router.delete('/details/:listingId', (req, res) => {
//   const { listingId } = req.params;
//   console.log('deleting');
//   model.deleteListing(listingId, (err, result) => {
//     if (err) console.log(err);
//     res.statusCode = err ? 400 : 200;
//     res.send(err || result);
//   });
// });

// router.put('/details/:listingId/highlights/:highlightId', (req, res) => {
//   const { listingId, highlightId } = req.params;
//   const { feedback } = req.body;
//   model.updateHighlightFeedback(
//     listingId,
//     highlightId,
//     feedback,
//     (err, results) => {
//       if (err) console.log(err);
//       res.statusCode = err ? 400 : 200;
//       res.send(err || results);
//     }
//   );
// });

module.exports = router;
