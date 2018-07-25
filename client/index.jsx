import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

const pathPattern = /listing\/\d+/;

if (pathPattern.test(window.location.pathname)) {
  ReactDOM.render(<App />, window.document.getElementById('Details'));
}
