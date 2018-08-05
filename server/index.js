const ReactDOM = require('react-dom/server');
const React = require('react');
const express = require('express');
const parser = require('body-parser');

const App = require('../client/components/App');
const html = require('./html');
const model = require('./model');

const port = process.env.PORT || 3001;

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
  const { listingId } = req.params;
  model.getListingDetails(listingId, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.put('/api/details/:listingId/highlights/:highlightId', (req, res) => {
  const { listingId, highlightId } = req.params;
  const { feedback } = req.body;
  model.updateHighlightFeedback(listingId, highlightId, feedback, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.get('/listing/:listingId', (req, res) => {
  const { listingId } = req.params;
  model.getListingDetails(listingId, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    const body = ReactDOM.renderToString(<App listing={results} />);
    res.send(html({ title: 'AirBnH', body }));
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
