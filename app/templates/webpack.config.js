const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack');

module.exports = {
    entry: './app/src/scripts/index.js',
    output: {
        filename: 'bundle.js',
        publicPath: '/dist/',
        path: path.resolve(__dirname, 'dist/')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            _: 'underscore'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './app/index.html'
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './app',
        inline: true
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader'
            ]
        },
        {
            test: /\.scss$/,
            use: [
            'style-loader',
            'css-loader',
            'sass-loader'
            ]
        },
        {
            test: /\.(png|svg|jpg|gif|jpe|jpg|woff|woff2|eot|ttf)(\?.*$|$)/,
            use: [
            'file-loader'
            ]
        }
      ]
    }
};