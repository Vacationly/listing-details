require('dotenv').config();
// require('newrelic');

const app = require('./app');

app.listen(app.get('port'), () =>
  console.log(`Listening on port ${app.get('port')}!`)
);
