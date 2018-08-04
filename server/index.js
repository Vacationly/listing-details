import express from 'express';
import parser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';

import model from './model';
import App from '../client/components/App';
import Html from '../client/Html';

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
    res.send(Html({ title: 'AirBnH', body }));
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
