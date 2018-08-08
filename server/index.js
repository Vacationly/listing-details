const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');

const model = require('./model.js');

const port = process.env.PORT || 3001;

const app = express();

app.get('/listing/:id', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(express.static(path.join(__dirname, '../public')));

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

app.post('/api/details', (req, res) => {
  const { listingId } = req.params;
  console.log('posting');
  model.createListing(listingId, req.body, (err, result) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    res.send(err || result);
  });
});

app.delete('/api/details/:listingId', (req, res) => {
  const { listingId } = req.params;
  console.log('deleting');
  model.deleteListing(listingId, (err, result) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    res.send(err || result);
  });
});

app.put('/api/details/:listingId/highlights/:highlightId', (req, res) => {
  const { listingId, highlightId } = req.params;
  const { feedback } = req.body;
  model.updateHighlightFeedback(
    listingId,
    highlightId,
    feedback,
    (err, results) => {
      if (err) console.log(err);
      res.statusCode = err ? 400 : 200;
      res.send(err || results);
    }
  );
});

// app.use('/', express.static(`${__dirname}/../public`));

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
