const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry:  './index.js',

  output: {
    filename: 'bundle.js'
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  }
};
