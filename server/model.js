const models = require('../data');

const getListingDetails = function (id, callback) {
  let listing = {};
  models.Listing.findOne({ listingId: id })
    .then((result) => {
      listing = { ...result._doc };
    })
    .then(() => models.ListingType.findOne({ id: listing.typeId }))
    .then((result) => {
      listing.listingType = result;
      delete listing.typeId;
    })
    .then(() => models.Host.findOne({ id: listing.hostId }))
    .then((result) => {
      listing.host = result;
      delete listing.hostId;
    })
    .then(() => models.CancellationPolicy.findOne({ id: listing.cancellationPolicyId }))
    .then((result) => {
      listing.cancellationPolicy = result;
      delete listing.cancellationPolicyId;
    })
    .then(() => models.Amenity.find({ id: { $in: listing.amenityIds } }))
    .then((results) => {
      listing.amenities = results;
      delete listing.amenityIds;
    })
    .then(() => callback(null, listing))
    .catch((err) => {
      callback(err);
    });
};

const updateHighlightFeedback = function (listingId, highlightId, feedback, callback) {
  models.Listing.findOneAndUpdate(
    { listingId, 'highlights.id': highlightId },
    { $inc: { 'highlights.$.upvotes': feedback } },
  )
    .then(() => callback(null, 'Successfully updated'))
    .catch(err => callback(err));
};

module.exports = {
  getListingDetails,
  updateHighlightFeedback,
};
