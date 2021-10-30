const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './index.tsx',
    },
    context: path.resolve(__dirname, "static_src"),
    output: {
        path: path.resolve(__dirname, "static", "build"),
        filename: 'app.js',
        publicPath: '/static/build/',
    },

    module: {
        rules: [{
                test: /\.tsx$/,
                exclude: [/node_modules/],
                loader: 'ts-loader'
            },
            // {
            //     test: /\.tsx$/,
            //     include: path.resolve(__dirname, "static_src"),
            //     loader: 'babel-loader',
            //     exclude: /node_modules/,
            //     options: {
            //         presets: ['@babel/env', '@babel/react', '@babel/preset-typescript'],
            //         plugins: [
            //             [
            //                 "@babel/plugin-proposal-class-properties",
            //                 {
            //                     "loose": true
            //                 }
            //             ]
            //         ]
            //     }
            // },
        ],
    },
    resolve: {
        modules: [`${__dirname}/static_src`, 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

};