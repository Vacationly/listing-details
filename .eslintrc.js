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
    'no-undef': 'off',
    'func-names': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-array-index-key': 'off',
  },
};
