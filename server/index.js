const express = require('express');
const parser = require('body-parser');

const model = require('./model.js');

const port = process.env.PORT || 3000;

const app = express();
app.use('/listings/:id', express.static(`${__dirname}/../public`));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get('/api/listings/:listingId', (req, res) => {
  const { listingId } = req.params;
  model.getListingDetails(listingId, (err, results) => {
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.put('/api/listings/:listingId/highlights/:highlightId', (req, res) => {
  const { listingId, highlightId } = req.params;
  const { feedback } = req.body;
  model.updateHighlightFeedback(listingId, highlightId, feedback, (err, results) => {
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
