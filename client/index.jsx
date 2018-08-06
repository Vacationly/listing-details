import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const window = window || global;

window.App = App;

const container = window.document && window.document.getElementById('details');
if (container) {
  axios.get('api/details/1').then((response) => {
    ReactDOM.hydrate(React.createElement(App, { listing: response.data }), container);
  });
}
