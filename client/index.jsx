import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const listingParam = window.location.pathname.split('listing/')[1];
const listingId = parseInt(listingParam, 10) || 0;
const props = { match: { params: { listingId } } };

ReactDOM.render(<App {...props} />, window.document.getElementById('Details'));
