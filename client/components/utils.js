const apiEndpoint = '/api/listings';
const imagesEndpoint = 'https://s3.amazonaws.com/fec-overview-service-images';
const amenitiesThreshold = 6;
const rulesThreshold = 3;
const placeholderListing = {
  title: 'Oops! No listing found.',
  listingType: { value: 'Nonexistent' },
  location: { city: 'Nowheresville', state: 'Nowherenia', country: 'Nowheresland' },
  host: { name: 'Nobody', avatar: '' },
  capacity: [{ name: 'Rooms', value: 0, icon: '' }],
};

const processKeyUp = (e, handler) => {
  e.key === 'Enter' && handler();
};

const expandCollapse = (wrapperClass, contentClass, expanded) => {
  const wrapper = window.document.getElementsByClassName(wrapperClass)[0];
  const content = window.document.getElementsByClassName(contentClass)[0];
  wrapper.style.height = expanded ? `${content.clientHeight}px` : '0px';
};

module.exports = {
  constants: {
    apiEndpoint,
    imagesEndpoint,
    amenitiesThreshold,
    rulesThreshold,
    placeholderListing,
  },
  functions: {
    expandCollapse,
    processKeyUp,
  },
};
