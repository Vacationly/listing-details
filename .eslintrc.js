/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  extends: 'airbnb',
  env: {
    jest: true,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'func-names': 'off',
    'react/destructuring-assignment': 'never',
    'react/jsx-filename-extension': 'never',
  },
};
