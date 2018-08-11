// var toCSV = require('csv-stringify');
var toCSV = require('csv-write-stream');
const fs = require('fs-extra');
const stream = require('stream');
const faker = require('faker');
const path = require('path');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

const MAX_LISTINGS = 10000000;
const MAX_LOCATIONS = 10;
const MAX_TYPES = 1;
const MAX_HOSTS = 20;
const MAX_AMENITIES = 40;
const MAX_CANCELLATION_POLICYS = 4;
const MAX_HIGHLIGHTS = 3;
const MAX_HOUSE_RULES = 3;
const csvPath = path.join(__dirname, 'csv');
const imageEndpoint = 'https://s3.amazonaws.com/fec-overview-service-images';

// var listingSteps = [['Listings', MAX_LISTINGS, generateListing]];

// var staticSteps = [
//   // [ 'Listings', MAX_LISTINGS, generateListing],
//   // ['Location', MAX_LOCATIONS, generateLocation],
//   // ['ListingsTypes', MAX_TYPES, generateListingType],
//   // ['Hosts', MAX_HOSTS, generateHost],
//   // ['Amenitys', MAX_AMENITIES, generateAmenity]
// ];

// const streams = {
//   Listings: openWrite('Listings'),
//   // Location: openWrite('Location'),
//   // ListingsTypes: openWrite('ListingsTypes'),
//   // Hosts: openWrite('Hosts'),
//   // Amenitys: openWrite('Amenitys'),
//   Highlights: openWrite('Highlights'),
//   'Cancellation-Policy': openWrite('Cancellation-Policy'),
//   HouseRules: openWrite('HouseRules')
// };
// var nonStaticSteps = [
//   ['Highlights', MAX_HIGHLIGHTS, generateHighlights],
//   ['Cancellation-Policy', MAX_CANCELLATION_POLICYS, generateCancellationPolicy],
//   ['HouseRules', MAX_HOUSE_RULE, generateHouseRules]
// ];

// if (cluster.isMaster) {
//   var splitBy = Math.ceil(MAX_LISTINGS / numCPUs);

//   [nonStaticSteps, staticSteps, listingSteps].forEach(function(step) {
//     step.forEach(applyHeaders);
//   });

//   for (let i = 0; i < numCPUs; i++) {
//     var end = i * splitBy + splitBy;

//     var fork = cluster.fork({
//       start: i * Math.floor(splitBy) + 1,
//       end: end > MAX_LISTINGS ? MAX_LISTINGS : end,
//       makeFile: i === 0
//     });

//     // fork.on('disconnect', () => console.log('ended', i));
//   }
// } else {
//   // console.log(process.pid, process.env.start, process.env.end);

//   runSteps(
//     listingSteps,

//     function(listingId, _name, _generatefn, _max) {
//       // console.log('starting processes for listing: ', listingId);
//       runSteps(
//         nonStaticSteps,
//         function(id, name, generatefn, max) {
//           return new generatefn(id, listingId);
//         }
//         // function(name) {
//         //   // console.log(name, 'is done running');
//         // }
//       );
//       return new _generatefn(listingId);
//     },
//     // function() {
//     //   // console.log('done with listing');
//     //   console.log('all done');
//     //   cluster.worker.process.exit();

//     //   // for (let key in streams) {
//     //   //   // streams[key].end();
//     //   //   // streams[key].close();
//     //   //   // process.exit()
//     //   //   // console.log('\n', key, '\n');
//     //   //   // console.log(streams[key]);
//     //   // }
//     // },
//     process.env
//   );
// }

// /*
//    * Helper functions
//   */
// function applyHeaders(item) {
//   let name = item[0];
//   let genFn = item[2];
//   let file = streams[name];

//   console.log(Object.keys(new genFn()).join(',') + '\n');
// }

function ranNum(max) {
  return Math.floor(Math.random() * max);
}

// function runSteps(steps, cb, done, opts) {
//   // var processes = [];
//   steps.forEach(function(item, idx) {
//     var name = item[0];
//     var max = item[1];
//     var generatefn = item[2];
//     // var csvData = item[3];

//     // let csvData = toCSV({ sendHeaders: false });

//     // csvData.pipe(
//     //   openWrite(name)
//     //   // { end: false }
//     // );

//     runIdProcess(
//       max,
//       function(id) {
//         const data = cb(id, name, generatefn, max);
//         // csvData.write(data);
//         console.log(Object.values(data).join(',') + '\n');
//       },
//       opts || {}
//     );

//     // csvData.end();
//   });
//   // opts && steps[0][3].end();
// }
// function runIdProcess(max, cb, opts = {}) {
//   for (let i = +opts.start || 1; i <= (+opts.end || max); i++) {
//     cb(i);
//   }
// }
// /*
//    * Data Constructors
//   */

// function openWrite(name) {
//   return fs.createWriteStream(path.join(csvPath, name + '.csv'), {
//     flags: 'a',
//     autoClose: false
//   });
// }

function generateHighlights(id, listingId) {
  // this.id = id || '';
  this.id = faker.random.uuid();
  this.tagline = faker.random.words();
  this.description = faker.lorem.sentence();
  this.upvotes = 0;
  this.listingId = listingId || '';
}
function generateHouseRules(id, listingId) {
  // this.id = id || '';
  this.id = faker.random.uuid();
  this.rule = faker.random.words();
  this.listingId = listingId || '';
}
function generateLocation(id) {
  this.id = id || '';
  this.city = faker.address.city();
  this.state = faker.address.state();
  this.country = faker.address.country();
}
function generateListingType(id) {
  this.id = id || '';
  this.name = faker.random.words();
}
function generateHost(id) {
  this.id = id || '';
  this.name = faker.name.findName();
  // this.avatar = faker.image.avatar();
  this.avatar = `${imageEndpoint}/host_${id}.jpg`;
}
function generateAmenity(id) {
  this.id = id || '';
  this.name = faker.random.word();
  this.icon = `${imageEndpoint}/amenity_${id % 5}.png`;
}
function generateCancellationPolicy(id, listingId) {
  // this.id = id || '';
  this.id = faker.random.uuid();
  this.name = faker.random.words();
  this.overview = faker.lorem.sentence();
  this.description = faker.lorem.sentence();
  this.listingId = listingId || '';
}
function generateListing(id) {
  // this.amenitys
  this.listingId = id || '';
  this.typeId = ranNum(MAX_TYPES);
  this.hostId = ranNum(MAX_HOSTS);
  // this.title = faker.random.words();
  this.locationId = ranNum(MAX_LOCATIONS);
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
  generateLocation,
  generateListingType,
  generateHost,
  generateAmenity,
  generateCancellationPolicy,
  generateListing,
  MAX_LISTINGS,
  MAX_LOCATIONS,
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
