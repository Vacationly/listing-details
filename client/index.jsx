import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const window = window || global;

window.App = App;

const container = window.document && window.document.getElementById('details');
if (container) {
  const listingId = parseInt(window.location.pathname.split('listing/')[1], 10) || 1;
  axios.get(`http://localhost:3001/api/details/${listingId}`).then((response) => {
    ReactDOM.hydrate(React.createElement(App, { listing: response.data }), container);
  });
}
