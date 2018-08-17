import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const window = window || global;

window.App = App;

const container = window.document && window.document.getElementById('details');
if (container) {
  const props = JSON.parse(unescape(window.document.getElementById('props').textContent));
  ReactDOM.hydrate(React.createElement(App, props), container);
}
