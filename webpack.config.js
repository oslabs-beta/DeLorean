const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './client/index.js',
    output: {
        path: path.resolve('build'),
        filename: 'bundle.js',
    },
    plugins: [new HtmlWebpackPlugin({template: './index.html'})],
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    devServer: {
        compress: true,
        port: 8080,
        proxy: {
            '/': 'http://localhost:3000'
        }
    }
}