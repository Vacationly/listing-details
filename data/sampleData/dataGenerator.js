const faker = require('faker');

const imageUrl = 'https://s3.amazonaws.com/fec-overview-service-images';

const listingCount = 101;
const listingTypeCount = 3;
const hostCount = 10;
const amenityCount = 20;
const cancellationPolicyCount = 4;

const getFakeListing = function (id, highlights, rules, amenities) {
  return {
    highlights,
    rules,
    listingId: id,
    typeId: Math.floor(Math.random() * listingTypeCount),
    hostId: Math.floor(Math.random() * hostCount),
    amenityIds: amenities,
    cancellationPolicyId: Math.floor(Math.random() * cancellationPolicyCount),
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
    descriptions: {
      main: faker.lorem.paragraph(),
      more: [
        { title: 'The space', value: faker.lorem.paragraphs() },
        { title: 'Guest access', value: faker.lorem.paragraphs() },
        { title: 'Interaction with guests', value: faker.lorem.paragraphs() },
        { title: 'Other notables', value: faker.lorem.paragraphs() },
      ],
    },
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

const getFakeCancellationPolicy = function (id) {
  return {
    id,
    name: faker.random.words(),
    description: faker.lorem.paragraph(),
  };
};

const generateFakeListing = function (id) {
  const numAmenities = Math.random() * (amenityCount / 2);
  const numRules = Math.random() * 10;
  const highlights = [];
  const amenities = [];
  const rules = [];
  for (let i = 0; i < 3; i++) {
    highlights.push({
      id: i + 1,
      tagline: faker.random.words(),
      description: faker.lorem.paragraph(),
      upvotes: 0,
      downvotes: 0,
    });
  }
  for (let i = 0; i < numRules; i++) {
    rules.push(faker.random.words());
  }
  for (let i = 0; i < numAmenities; i++) {
    amenities.push(2 * i);
  }
  return getFakeListing(id, highlights, rules, amenities);
};

const generateData = function () {
  const listings = [];
  const listingTypes = [];
  const hosts = [];
  const amenities = [];
  const cancellationPolicys = [];
  for (let i = 0; i < listingCount; i++) {
    listings.push(generateFakeListing(i));
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
  for (let i = 0; i < cancellationPolicyCount; i++) {
    cancellationPolicys.push(getFakeCancellationPolicy(i));
  }
  return {
    Listing: listings,
    ListingType: listingTypes,
    Host: hosts,
    Amenity: amenities,
    CancellationPolicy: cancellationPolicys,
  };
};

module.exports = { generateData };
