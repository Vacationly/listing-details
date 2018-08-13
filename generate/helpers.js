// var toCSV = require('csv-stringify');
var toCSV = require('csv-write-stream');
const fs = require('fs-extra');
const stream = require('stream');
const faker = require('faker');
const path = require('path');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

const MAX_LISTINGS = 10000000;
// const MAX_LOCATIONS = 10;
const MAX_TYPES = 20000;
const MAX_HOSTS = 25000;
const MAX_AMENITIES = 70;
const MAX_CANCELLATION_POLICYS = 4;
const MAX_HIGHLIGHTS = 3;
const MAX_HOUSE_RULES = 3;
const csvPath = path.join(__dirname, 'csv');
const imageEndpoint = 'https://s3.amazonaws.com/fec-overview-service-images';

function ranNum(max) {
  return Math.floor(Math.random() * max);
}

function generateHighlights(id, listingId) {
  this.id = faker.random.uuid();
  this.tagline = faker.lorem.sentence();
  this.description = faker.lorem.sentence();
  this.upvotes = 0;
  this.listingId = listingId || '';
}
function generateHouseRules(id, listingId) {
  // this.id = id || '';
  this.id = faker.random.uuid();
  this.rule = faker.lorem.sentence();
  this.listingId = listingId || '';
}
// function generateLocation(id) {
//   this.id = id || '';
//   this.city = faker.address.city();
//   this.state = faker.address.state();
//   this.country = faker.address.country();
// }
function generateListingType(id) {
  this.id = id || '';
  this.name = faker.lorem.sentence();
}
function generateHost(id) {
  this.id = id || '';
  this.name = faker.name.findName();
  // this.avatar = faker.image.avatar();
  this.avatar = `${imageEndpoint}/host_${id % 5}.jpg`;
}
function generateAmenity(id) {
  this.id = id || '';
  this.name = faker.random.word();
  this.icon = `${imageEndpoint}/amenity_${id % 5}.png`;
}
function generateCancellationPolicy(id, listingId) {
  // this.id = id || '';
  this.id = faker.random.uuid();
  this.name = faker.lorem.sentence();
  this.overview = faker.lorem.sentence();
  this.description = faker.lorem.sentence();
  this.listingId = listingId || '';
}
function generateListing(id) {
  // this.amenitys
  this.listingId = id || '';
  this.typeId = ranNum(MAX_TYPES);
  this.hostId = ranNum(MAX_HOSTS);
  // this.title = faker.lorem.sentence();
  // this.locationId = ranNum(MAX_LOCATIONS);
  this.city = faker.address.city();
  this.guests = ranNum(4);
  this.bedrooms = ranNum(4);
  this.beds = ranNum(4);
  this.bathrooms = ranNum(4);
  this.description = faker.lorem.paragraph();
  this.additionalDescription = faker.lorem.paragraph();
}

function makeCSV(arr, obj) {
  return arr
    .map(function(item) {
      return obj ? obj[item] : item;
    })
    .join(',');
}

module.exports = {
  generateHighlights,
  generateHouseRules,
  // generateLocation,
  generateListingType,
  generateHost,
  generateAmenity,
  generateCancellationPolicy,
  generateListing,
  MAX_LISTINGS,
  // MAX_LOCATIONS,
  MAX_TYPES,
  MAX_HOSTS,
  MAX_AMENITIES,
  MAX_CANCELLATION_POLICYS,
  MAX_HIGHLIGHTS,
  MAX_HOUSE_RULES,
  csvPath,
  imageEndpoint,
  makeCSV
};
