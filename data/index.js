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

module.exports = {
  Listing,
  ListingType,
  Host,
  Amenity,
  CancellationType,
};
