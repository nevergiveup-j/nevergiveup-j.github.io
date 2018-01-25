const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./webpack.config.base');

config.entry = {
  index: [
    './examples/index.js'
  ]
}

if(config.plugins) {
  config.plugins.push(new ExtractTextPlugin('[name].css'));
}

config.devServer = {
  publicPath: '/',
  historyApiFallback: true,
  quiet: true,
};

module.exports = config;
