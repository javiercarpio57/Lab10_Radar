/* eslint-disable no-undef */
// import path from 'path'
// import HtmlWebpackPlugin from 'html-webpack-plugin'

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", 'postcss-loader', "sass-loader"]
            },
            {
                test: /\.(png|jpeg|jpg)$/,
                loader: 'url-loader'
            }
        ]
    }
}
