const mongoose = require('mongoose');
const schemas = require('./schemas.js');

const URI = `mongodb://${process.env.DB || 'localhost'}:27017/airbnh`;
mongoose.connect(URI, { useNewUrlParser: true }).catch(err => console.log(err));

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
