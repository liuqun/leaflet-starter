const path = require('path');
const webpack = require("webpack");

module.exports = {
    mode: 'production',
    entry: {
        bundle: './src/main.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: './dist/img/icon/[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        publicPath: '/',
        watchContentBase: true,
        open: true
    }
};

