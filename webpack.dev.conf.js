
const merge = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(base,{
    mode:'development',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({template: './index.html',filename:'index.html'}),
    ],
    entry: {
        app: './src/main.js',
    },
    output: {
        publicPath: '/views/',
        path: path.resolve(__dirname, 'views'),
        filename: 'js/build.js'
    },
    devServer: {
        contentBase: './views',
    }
})