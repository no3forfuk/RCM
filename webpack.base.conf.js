
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        publicPath: '/views/',
        path: path.resolve(__dirname, 'views'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/, 
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[hash:16].[ext]'
                        }
                    }
                ]
            }

        ]
    },
    plugins: []

}