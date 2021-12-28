const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './client/index.js',
    output: {
        path: path.resolve('build'),
        // publicPath: '/build/',
        filename: 'bundle.js',
    },
    plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({template: './index.html'})],
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use:[{
                        loader: 'url-loader',
                        options: {
                        limit: 8192,
                        },
                }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [ 
                    MiniCssExtractPlugin.loader,
                    // "style-loader", // this is only used if we don't use the css plugin
                    "css-loader",
                    "sass-loader",
                ]
            },
        ],
    },
    devServer: {
        // static: {
        //     directory: path.resolve('./'),
        // },
        compress: true,
        port: 8080,
        proxy: {
            '/': 'http://localhost:3000'
        }
    }
}