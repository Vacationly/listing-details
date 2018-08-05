const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    use: ['css-loader/locals'],
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
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: '[name].css',
  //   }),
  // ],
};
