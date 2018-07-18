const faker = require('faker');
const db = require('../index.js');

const baseURL = 'https://s3.amazonaws.com/fec-overview-service-images/';

const listingCount = 100;
const listingTypeCount = 3;
const hostCount = 10;
const amenityCount = 20;
const cancellationTypeCount = 4;

const getFakeListing = function(id) {
  let numAmenities = Math.random() * 10;
  let numRules = Math.random() * 10;
  let amenities = [];
  let rules = [];
  for (let i = 0; i < numAmenities; i++) {
    amenities.push(Math.floor(Math.random() * amenityCount));
  }
  for (let i = 0; i < numRules; i++) {
    rules.push(faker.random.words());
  }
  return {
    listing_id: id,
    type_id: Math.floor(Math.random() * listingTypeCount),
    host_id: Math.floor(Math.random() * hostCount),
    title: faker.random.words(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    guests: Math.ceil(Math.random() * 5),
    bedrooms: Math.ceil(Math.random() * 3),
    beds: Math.ceil(Math.random() * 5),
    baths: Math.ceil(Math.random() * 5),
    highlights: [
      {
        tagline: faker.random.words(),
        description: faker.lorem.paragraph(),
        upvotes: 0,
        downvotes: 0
      },
      {
        tagline: faker.random.words(),
        description: faker.lorem.paragraph(),
        upvotes: 0,
        downvotes: 0
      },
      {
        tagline: faker.random.words(),
        description: faker.lorem.paragraph(),
        upvotes: 0,
        downvotes: 0
      }
    ],
    description_summary: faker.lorem.paragraphs(),
    description_space: faker.lorem.paragraphs(),
    description_interaction: faker.lorem.paragraphs(),
    description_other: faker.lorem.paragraph(),
    amenity_ids: amenities,
    sleeping_arrangements: [
      {
        space_name: faker.random.words(),
        mattressType: faker.random.word(),
        number: Math.floor(Math.random() * 2)
      },
      {
        space_name: faker.random.words(),
        mattressType: faker.random.word(),
        number: Math.floor(Math.random() * 2)
      }
    ],
    rules: rules,
    cancellation_type_id: Math.floor(Math.random() * cancellationTypeCount)
  };
};

const getFakeListingType = function(id) {
  return { id, value: faker.random.words() };
};

const getFakeHost = function(id) {
  return {
    id,
    name: faker.name.findName(),
    avatar: faker.internet.avatar()
  };
};

const getFakeAmenity = function(id) {
  return { id, value: faker.random.words() };
};

const getFakeCancellationType = function(id) {
  return {
    id,
    title: faker.random.words(),
    description: faker.lorem.sentence()
  };
};

const getFakeData = function() {
  let listings = [];
  let listingTypes = [];
  let hosts = [];
  let amenities = [];
  let cancellationTypes = [];
  for (let i = 0; i < listingCount; i++) {
    listings.push(getFakeListing(i));
  }
  for (let i = 0; i < listingTypeCount; i++) {
    listingTypes.push(getFakeListingType(i));
  }
  for (let i = 0; i < hostCount; i++) {
    hosts.push(getFakeHost(i));
  }
  for (let i = 0; i < amenityCount; i++) {
    amenities.push(getFakeAmenity(i));
  }
  for (let i = 0; i < cancellationTypeCount; i++) {
    cancellationTypes.push(getFakeCancellationType(i));
  }
  return [listings, listingTypes, hosts, amenities, cancellationTypes];
};

const seedDatabase = function() {
  let data = getFakeData();
  Object.values(db).forEach((schema, index) => {
    schema
      .find({})
      .remove()
      .exec()
      .then(schema.insertMany(data[index]));
  });
};

// generateAvatars();
seedDatabase();
