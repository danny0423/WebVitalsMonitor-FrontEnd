const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',

  output: {
    filename: 'js/[name].js',
  },

  devtool: 'eval-source-map',

  devServer: {
    static: {
      directory: path.resolve(__dirname, '../public'),
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    compress: true,
    
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    ],

    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },

  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],

  cache: {
    type: 'filesystem',
  },
};
