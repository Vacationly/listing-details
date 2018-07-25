import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const dummyProps = { match: { params: { listingId: Math.floor(Math.random() * 100) } } };

ReactDOM.render(<App {...dummyProps} />, window.document.getElementById('Details'));
