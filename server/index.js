const ReactDOM = require('react-dom/server');
const React = require('react');
const express = require('express');
const parser = require('body-parser');
const fs = require('fs');
const path = require('path');
const model = require('./model');
const html = require('./html');

require('../client/dist/bundle.js');

let styles;

fs.readFile(path.resolve(__dirname, '../client/dist/bundle.css'), 'utf8', (err, result) => {
  if (err) console.log(err);
  else styles = result;
});

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET');
  next();
});

app.get('/api/details/:listingId', (req, res) => {
  const listingId = req.params.listingId;

  model.getListingDetails(listingId, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.put('/api/details/:listingId/highlights/:highlightId', (req, res) => {
  let _req$params = req.params,
    listingId = _req$params.listingId,
    highlightId = _req$params.highlightId;
  const feedback = req.body.feedback;

  model.updateHighlightFeedback(listingId, highlightId, feedback, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.get('/listing/:listingId', (req, res) => {
  const listingId = req.params.listingId;

  model.getListingDetails(listingId, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    const body = ReactDOM.renderToString(React.createElement(App, { listing: results }));
    res.send(html({ title: 'AirBnH', body, styles }));
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
