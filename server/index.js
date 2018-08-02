const express = require('express');
const parser = require('body-parser');

const model = require('./model.js');

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
    console.log(err || 'GET request successful!');
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.put('/api/details/:listingId/highlights/:highlightId', (req, res) => {
  const { listingId, highlightId } = req.params;
  const { feedback } = req.body;
  model.updateHighlightFeedback(listingId, highlightId, feedback, (err, results) => {
    console.log(err || 'PUT request successful!');
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.use('/*', express.static(`${__dirname}/../public`));

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
