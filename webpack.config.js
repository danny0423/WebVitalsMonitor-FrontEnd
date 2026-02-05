const { merge } = require('webpack-merge');
const common = require('./webpack/webpack.common.js');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  
  if (isDevelopment) {
    const dev = require('./webpack/webpack.dev.js');
    return merge(common, dev);
  } else {
    const prod = require('./webpack/webpack.prod.js');
    return merge(common, prod);
  }
};
