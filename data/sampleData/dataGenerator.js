const faker = require('faker');

const imageUrl = 'https://s3.amazonaws.com/fec-overview-service-images/';

const listingCount = 101;
const listingTypeCount = 3;
const hostCount = 10;
const amenityCount = 20;
const cancellationTypeCount = 4;

const getFakeListing = function (id) {
  const numAmenities = Math.random() * 10;
  const numRules = Math.random() * 10;
  const amenities = [];
  const rules = [];
  for (let i = 0; i < numAmenities; i++) {
    amenities.push(Math.floor(Math.random() * amenityCount));
  }
  for (let i = 0; i < numRules; i++) {
    rules.push(faker.random.words());
  }
  return {
    listingId: id,
    typeId: Math.floor(Math.random() * listingTypeCount),
    hostId: Math.floor(Math.random() * hostCount),
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
        downvotes: 0,
      },
      {
        tagline: faker.random.words(),
        description: faker.lorem.paragraph(),
        upvotes: 0,
        downvotes: 0,
      },
      {
        tagline: faker.random.words(),
        description: faker.lorem.paragraph(),
        upvotes: 0,
        downvotes: 0,
      },
    ],
    descriptionSummary: faker.lorem.paragraphs(),
    descriptionSpace: faker.lorem.paragraphs(),
    descriptionInteraction: faker.lorem.paragraphs(),
    descriptionOther: faker.lorem.paragraph(),
    amenityIds: amenities,
    sleepingArrangements: [
      {
        spaceName: faker.random.words(),
        mattressType: faker.random.word(),
        number: Math.floor(Math.random() * 2),
      },
      {
        spaceName: faker.random.words(),
        mattressType: faker.random.word(),
        number: Math.floor(Math.random() * 2),
      },
    ],
    rules,
    cancellationTypeId: Math.floor(Math.random() * cancellationTypeCount),
  };
};

const getFakeListingType = function (id) {
  return { id, value: faker.random.words() };
};

const getFakeHost = function (id) {
  return {
    id,
    name: faker.name.findName(),
    avatar: `${imageUrl}/host_${id}.jpg`,
  };
};

const getFakeAmenity = function (id) {
  return { id, value: faker.random.words() };
};

const getFakeCancellationType = function (id) {
  return {
    id,
    title: faker.random.words(),
    description: faker.lorem.sentence(),
  };
};

const generateData = function () {
  const listings = [];
  const listingTypes = [];
  const hosts = [];
  const amenities = [];
  const cancellationTypes = [];
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
  return {
    Listing: listings,
    ListingType: listingTypes,
    Host: hosts,
    Amenity: amenities,
    CancellationType: cancellationTypes,
  };
};

module.exports = { generateData };
