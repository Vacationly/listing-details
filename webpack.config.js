const path = require('path');

const ENTRY_POINT = path.resolve(__dirname, 'client/index.js');

const OUTPUT_PATH = path.resolve(__dirname, 'public/dist');

const DEV_SERVER = { contentBase: 'public/dist' };

const LOADER_OBJECT = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: ['react', 'env'],
    },
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    loader: 'style-loader!css-loader',
  },
  {
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
  },
];

module.exports = {
  entry: ENTRY_POINT,
  output: {
    filename: 'bundle.js',
    path: OUTPUT_PATH,
  },
  devServer: DEV_SERVER,
  devtool: 'source-map',
  // watch: true,
  module: {
    rules: LOADER_OBJECT,
  },
};
