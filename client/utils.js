const apiEndpoint = window.location.href.includes('localhost')
  ? 'http://localhost:3001/api/listings'
  : 'http://ec2-54-200-238-109.us-west-2.compute.amazonaws.com:3001/api/listings';
const imagesEndpoint = 'https://s3.amazonaws.com/fec-overview-service-images';
const amenitiesThreshold = 6;
const sleepingArrangementsThreshold = 3;
const houseRulesThreshold = 3;
const dummyListing = {
  title: 'Oops! No listing found.',
  listingType: { name: 'Nonexistent' },
  location: {
    city: 'Nowheresville',
    state: 'Nowherenia',
    country: 'Nowheresland',
  },
  host: { name: 'Nobody', avatar: `${imagesEndpoint}/confused_avatar.png` },
  capacity: [{ name: 'Bedroom', number: 0, icon: `${imagesEndpoint}/bedroom.png` }],
};

const processKeyUp = (e, handler) => {
  if (e.key === 'Enter') {
    handler();
  }
};

module.exports = {
  constants: {
    apiEndpoint,
    imagesEndpoint,
    amenitiesThreshold,
    houseRulesThreshold,
    sleepingArrangementsThreshold,
    dummyListing,
  },
  functions: {
    processKeyUp,
  },
};
