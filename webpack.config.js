var path = require('path');

var ENTRY_POINT = path.resolve(__dirname, 'client/main.js');

var OUTPUT_PATH = path.resolve(__dirname, 'client/dist');

var LOADER_OBJECT = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: ['react', 'env']
    }
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    loader: 'style-loader!css-loader'
  }
];

module.exports = {
  entry: ENTRY_POINT,
  output: {
    filename: 'bundle.js',
    path: OUTPUT_PATH
  },
  devtool: 'source-map',
  mode: 'development',
  watch: true,
  module: {
    rules: LOADER_OBJECT
  }
};
