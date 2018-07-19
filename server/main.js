const express = require('express');

const db = require('../data');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(`${__dirname}/../public`));

app.get('/listings/:id', (req, res) => {
  const listingId = req.params.id;
  db.getListingDetails(listingId, (err, results) => {
    res.send(err || results);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
