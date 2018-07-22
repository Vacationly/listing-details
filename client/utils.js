const baseUrl = 'https://s3.amazonaws.com/fec-overview-service-images';
const expandCollapse = (wrapperClass, contentClass, expanded) => {
  const wrapper = window.document.getElementsByClassName(wrapperClass)[0];
  const content = window.document.getElementsByClassName(contentClass)[0];
  wrapper.style.height = expanded ? `${content.clientHeight}px` : '0px';
};

module.exports = {
  baseUrl,
  expandCollapse,
};
