const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');

const model = require('../database');

const routes = require('../routes');

const app = express();

app.set('port', process.env.PORT || 3001);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res) {
  res.redirect('/listing/1');
});

app.get('/listing/:id', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use('/api', routes);

module.exports = app;
