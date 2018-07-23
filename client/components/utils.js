const apiEndpoint = '/api/listings';
const imagesEndpoint = 'https://s3.amazonaws.com/fec-overview-service-images';
const amenitiesThreshold = 6;
const sleepingArrangementsThreshold = 3;
const houseRulesThreshold = 3;
const dummyListing = {
  title: 'Oops! No listing found.',
  listingType: { value: 'Nonexistent' },
  location: { city: 'Nowheresville', state: 'Nowherenia', country: 'Nowheresland' },
  host: { name: 'Nobody', avatar: `${imagesEndpoint}/confused_avatar.png` },
  capacity: [{ name: 'Rooms', value: 0 }],
};

const processKeyUp = (e, handler) => {
  e.key === 'Enter' && handler();
};

const expandCollapse = (wrapperClass, contentClass, expanded) => {
  const wrapper = window.document.getElementsByClassName(wrapperClass)[0];
  const content = window.document.getElementsByClassName(contentClass)[0];
  wrapper.style.height = expanded ? `${content.clientHeight + content.style.margin}px` : '0px';
  wrapper.style.opacity = expanded ? 1 : 0;
  wrapper.style.overflow = expanded ? 'visible' : 'hidden';
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
    expandCollapse,
    processKeyUp,
  },
};
