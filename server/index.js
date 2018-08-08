const express = require('express');
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');

const model = require('./model.js');

const port = process.env.PORT || 3001;

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

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

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../public/index.html`));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
