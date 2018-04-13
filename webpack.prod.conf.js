const merge = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(base,{
    mode:'production',
    plugins: [
        new HtmlWebpackPlugin({template: './index.html',filename:'index.html'}),
        new cleanWebpackPlugin('views')
    ]
})