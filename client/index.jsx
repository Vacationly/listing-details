import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App';

window.Details = App;

const container = document.getElementById('Details');
if (container) {
  ReactDOM.render(<App />, container);
}
