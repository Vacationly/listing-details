const path = require('path');
const nodeExternals = require('webpack-node-externals');

const ENTRY_POINT = path.resolve(__dirname, 'server/index.js');

const OUTPUT_PATH = path.resolve(__dirname, 'server/dist');

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
    loader:
      'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
  },
];

module.exports = {
  entry: ENTRY_POINT,
  output: {
    filename: 'bundle.js',
    path: OUTPUT_PATH,
  },
  externals: nodeExternals(),
  devtool: 'source-map',
  module: {
    rules: LOADER_OBJECT,
  },
  resolve: { extensions: ['.js', '.jsx'] },
};
