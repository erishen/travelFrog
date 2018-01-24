const webpack = require('webpack');
const path = require('path');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
    entry: {
        inke: ['./client/wildsPAGE/inke', hotMiddlewareScript],
        seniverse: ['./client/wildsPAGE/seniverse', hotMiddlewareScript],
        react: ['./client/wildsPAGE/react', hotMiddlewareScript]
    },
    output: {
        filename: './wildsPAGE/[name]/bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: publicPath
    },
    devtool: 'eval-source-map',
    module: {
        rules: [{
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: 'url-loader?limit=100000&context=client&name=[path][name].[ext]'
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                'style-loader',
                'css-loader?sourceMap',
                'resolve-url-loader',
                'sass-loader?sourceMap'
            ]
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
                'style-loader',
                'css-loader?sourceMap',
                'resolve-url-loader',
                'less-loader?sourceMap'
            ]
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = devConfig;
