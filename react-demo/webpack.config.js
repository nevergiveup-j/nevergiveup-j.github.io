var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname + '/app.js'),
        // 当 React 作为一个 node 模块安装的时候，
        // 我们可以直接指向它，就比如 require('react')
        vendors: ['react','react-router']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'jsx-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap')
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin("main.css", {allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].js'
    }
};