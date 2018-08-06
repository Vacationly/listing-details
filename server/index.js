const ReactDOM = require('react-dom/server');
const React = require('react');
const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const fs = require('fs');
const path = require('path');
const model = require('./model');
const Html = require('./Html');
require('../client/dist/bundle.js');

let styles;

fs.readFile(path.resolve(__dirname, '../client/dist/bundle.css'), 'utf8', (err, result) => {
  if (err) console.log(err);
  else styles = result;
});

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/details/:listingId', (req, res) => {
  const {
    params: { listingId },
  } = req;

  model.getListingDetails(listingId, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.put('/api/details/:listingId/highlights/:highlightId', (req, res) => {
  const {
    params: { listingId, highlightId },
  } = req;
  const {
    body: { feedback },
  } = req;

  model.updateHighlightFeedback(listingId, highlightId, feedback, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  // const {
  //   params: { listingId },
  // } = req;

  const listingId = 1;

  model.getListingDetails(listingId, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    const body = ReactDOM.renderToString(React.createElement(App, { listing: results }));
    res.send(Html({ title: 'AirBnH', body, styles }));
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
