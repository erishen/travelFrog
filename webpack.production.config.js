const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var productionConfig = [{
    entry: {
        inke: './client/wildsPAGE/inke',
        seniverse: './client/wildsPAGE/seniverse',
        react: './client/wildsPAGE/react'
    },
    output: {
        filename: './wildsPAGE/[name]/bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: 'url-loader?limit=100000&context=client&name=[path][name].[ext]'
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
            })
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'resolve-url-loader', 'less-loader?sourceMap']
            })
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['public/wildsPAGE']),
        new ExtractTextPlugin({
            filename: './wildsPAGE/[name]/index.css',
            allChunks: true
        }),
        new UglifyJSPlugin(),
        new OptimizeCssAssetsPlugin()
    ]
}];

module.exports = productionConfig;
