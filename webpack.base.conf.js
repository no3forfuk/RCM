const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, './dist'),
        filename: 'Admin/js/vue.js',
        chunkFilename: 'Admin/js/[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '~': path.resolve(__dirname, 'src')
        }
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
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'Admin/images',
                            name: '[hash:16].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                // use: ['css-loader']
                use: ExtractTextPlugin.extract({
                    fallback: "vue-style-loader",
                    use: ['css-loader']
                })
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin("Admin/css/[name].css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]

}