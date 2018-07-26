const faker = require('faker');

const imageEndpoint = 'https://s3.amazonaws.com/fec-overview-service-images';

const listingCount = 101;
const listingTypeCount = 3;
const hostCount = 10;
const amenityCount = 40;
const cancellationPolicyCount = 4;

const getFakeListing = function (id, amenityIds, highlights, houseRules, sleepingArrangements) {
  return {
    amenityIds,
    highlights,
    houseRules,
    sleepingArrangements,
    listingId: id,
    typeId: Math.floor(Math.random() * listingTypeCount),
    hostId: Math.floor(Math.random() * hostCount),
    cancellationPolicyId: Math.floor(Math.random() * cancellationPolicyCount),
    title: faker.random.words(),
    location: {
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
    },
    capacity: [
      { name: 'Guest', number: Math.ceil(Math.random() * 5), icon: `${imageEndpoint}/guest.png` },
      {
        name: 'Bedroom',
        number: Math.ceil(Math.random() * 3),
        icon: `${imageEndpoint}/bedroom.png`,
      },
      { name: 'Bed', number: Math.ceil(Math.random() * 5), icon: `${imageEndpoint}/bed.png` },
      { name: 'Bath', number: Math.ceil(Math.random() * 5), icon: `${imageEndpoint}/bath.png` },
    ],
    description: {
      main: faker.lorem.paragraph(),
      more: [
        { title: 'The space', text: faker.lorem.paragraph() },
        { title: 'Guest access', text: faker.lorem.paragraph() },
        { title: 'Interaction with guests', text: faker.lorem.paragraph() },
        { title: 'Other notables', text: faker.lorem.paragraph() },
      ],
    },
    videoSource: `${imageEndpoint}/home_video.mp4`,
  };
};

const getFakeListingType = function (id) {
  return { id, name: faker.random.words() };
};

const getFakeHost = function (id) {
  return {
    id,
    name: faker.name.findName(),
    avatar: `${imageEndpoint}/host_${id}.jpg`,
  };
};

const getFakeAmenity = function (id) {
  return { id, name: faker.random.words(), icon: `${imageEndpoint}/amenity_${id % 5}.png` };
};

const getFakeCancellationPolicy = function (id) {
  return {
    id,
    name: faker.random.words(),
    overview: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
  };
};

const generateFakeListing = function (id) {
  const numAmenities = Math.random() * (amenityCount / 2);
  const numRules = Math.random() * 10;
  const numSleepingArrangements = Math.random() * 10;
  const highlights = [];
  const amenityIds = [];
  const houseRules = [];
  const sleepingArrangements = [];
  for (let i = 0; i < numAmenities; i++) {
    amenityIds.push(2 * i);
  }
  for (let i = 0; i < 3; i++) {
    highlights.push({
      id: i + 1,
      tagline: faker.random.words(),
      description: faker.lorem.sentence(),
      upvotes: 0,
    });
  }
  for (let i = 0; i < numRules; i++) {
    houseRules.push(faker.random.words());
  }
  for (let i = 0; i < numSleepingArrangements; i++) {
    sleepingArrangements.push({
      spaceName: faker.random.words(),
      mattressType: faker.random.word(),
      number: Math.ceil(Math.random() * 3),
    });
  }
  return getFakeListing(id, amenityIds, highlights, houseRules, sleepingArrangements);
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
