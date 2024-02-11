const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    const isDevMode = argv.mode === 'development';

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDevMode ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
            clean: true,
        },
        mode: argv.mode,
        devtool: isDevMode ? 'inline-source-map' : false,
        devServer: {
            contentBase: './dist',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new Dotenv({
                path: isDevMode ? './.env.dev' : './.env.prod',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
            ],
        },
    };
};
