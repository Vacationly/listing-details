const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ENTRY_POINT = path.resolve(__dirname, 'client/index.jsx');

const OUTPUT_PATH = path.resolve(__dirname, 'dist/ssr');

const LOADER_OBJECT = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules|dist/,
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
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
};
