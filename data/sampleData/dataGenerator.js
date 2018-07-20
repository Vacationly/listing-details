const faker = require('faker');

const imageUrl = 'https://s3.amazonaws.com/fec-overview-service-images';

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
    rules,
    listingId: id,
    typeId: Math.floor(Math.random() * listingTypeCount),
    hostId: Math.floor(Math.random() * hostCount),
    amenityIds: amenities,
    cancellationTypeId: Math.floor(Math.random() * cancellationTypeCount),
    title: faker.random.words(),
    location: {
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
    },
    capacity: [
      { name: 'Guests', value: Math.ceil(Math.random() * 5), icon: `${imageUrl}/guest.png` },
      { name: 'Bedrooms', value: Math.ceil(Math.random() * 3), icon: `${imageUrl}/room.png` },
      { name: 'Beds', value: Math.ceil(Math.random() * 5), icon: `${imageUrl}/bed.png` },
      { name: 'Baths', value: Math.ceil(Math.random() * 5), icon: `${imageUrl}/bath.png` },
    ],
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
    descriptions: [
      { name: 'Summary', value: faker.lorem.paragraphs() },
      { name: 'Space', value: faker.lorem.paragraphs() },
      { name: 'Host Interaction', value: faker.lorem.paragraphs() },
      { name: 'Other', value: faker.lorem.paragraphs() },
    ],
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
  return { id, value: faker.random.words(), icon: `${imageUrl}/amenity_${id % 5}.png` };
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
