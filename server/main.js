const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

const compiler = webpack({ publicPath: `${__dirname}/../public/dist` });
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(`${__dirname}/../public`));

app.listen(port, () => console.log(`Listening on port ${port}!`));
