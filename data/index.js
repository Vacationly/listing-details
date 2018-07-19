const mongoose = require('mongoose');
const schemas = require('./schemas.js');

mongoose.connect('mongodb://localhost/airbnb');

const listingSchema = mongoose.Schema(schemas.listing);
const listingTypeSchema = mongoose.Schema(schemas.listingType);
const hostSchema = mongoose.Schema(schemas.host);
const amenitySchema = mongoose.Schema(schemas.amenity);
const cancellationTypeSchema = mongoose.Schema(schemas.cancellationType);

const Listing = mongoose.model('Listing', listingSchema);
const ListingType = mongoose.model('ListingType', listingTypeSchema);
const Host = mongoose.model('Host', hostSchema);
const Amenity = mongoose.model('Amenity', amenitySchema);
const CancellationType = mongoose.model('CancellationType', cancellationTypeSchema);

const getListingDetails = function (id, callback) {
  let listing = {};
  Listing.findOne({ listingId: id })
    .then((result) => {
      listing = { ...result._doc };
    })
    .then(() => ListingType.findOne({ id: listing.typeId }))
    .then((result) => {
      listing.listingType = result;
      delete listing.typeId;
    })
    .then(() => Host.findOne({ id: listing.hostId }))
    .then((result) => {
      listing.host = result;
      delete listing.hostId;
    })
    .then(() => CancellationType.findOne({ id: listing.cancellationTypeId }))
    .then((result) => {
      listing.cancealltionType = result;
      delete listing.cancellationTypeId;
    })
    .then(() => Amenity.find({ id: { $in: listing.amenityIds } }))
    .then((results) => {
      listing.amenities = results;
      delete listing.amenityIds;
    })
    .then(() => callback(null, listing))
    .catch((err) => {
      callback(err);
    });
};

module.exports = {
  getListingDetails,
  models: {
    Listing,
    ListingType,
    Host,
    Amenity,
    CancellationType,
  },
};
