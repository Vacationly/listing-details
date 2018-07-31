const mongoose = require('mongoose');
const schemas = require('./schemas.js');

const URI = process.env.MONGO_URI || 'mongodb://localhost/airbnh';
mongoose.connect(URI);

const listingSchema = mongoose.Schema(schemas.listing);
const listingTypeSchema = mongoose.Schema(schemas.listingType);
const hostSchema = mongoose.Schema(schemas.host);
const amenitySchema = mongoose.Schema(schemas.amenity);
const cancellationPolicySchema = mongoose.Schema(schemas.cancellationPolicy);

const Listing = mongoose.model('Listing', listingSchema);
const ListingType = mongoose.model('ListingType', listingTypeSchema);
const Host = mongoose.model('Host', hostSchema);
const Amenity = mongoose.model('Amenity', amenitySchema);
const CancellationPolicy = mongoose.model('CancellationPolicy', cancellationPolicySchema);

module.exports = {
  Listing,
  ListingType,
  Host,
  Amenity,
  CancellationPolicy,
};
