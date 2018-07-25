import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const listingId = window.location.pathname.split('listing/')[1] || 0;
const props = { match: { params: { listingId } } };

ReactDOM.render(<App {...props} />, window.document.getElementById('Details'));
