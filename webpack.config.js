const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ENTRY_POINT = path.resolve(__dirname, 'server/index.js');

const OUTPUT_PATH = path.resolve(__dirname, 'server/dist');

const LOADER_OBJECT = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    query: {
      presets: ['react', 'env'],
    },
  },
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    ],
  },
];

module.exports = {
  entry: ENTRY_POINT,
  output: {
    filename: 'bundle.js',
    path: OUTPUT_PATH,
  },
  module: {
    rules: LOADER_OBJECT,
  },
  context: __dirname,
  externals: nodeExternals(),
  devtool: 'source-map',
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
};
