const path = require('path');
const pak = require('../package.json');

module.exports = {
  dependencies: {
    [pak.name]: {
      root: path.join(__dirname, '..'),
    },
  },
  assets: [path.resolve(__dirname, '../ios/assets/fonts'), path.resolve(__dirname, '../android/src/main/assets/fonts')],
};
