const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtracPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPluin = require('optimize-css-assets-webpack-plugin');

const CopyPluging = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [new OptimizeCssAssetsPluin()]
    },
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtracPlugin.loader,
                    'css-loader'
                ]

            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false
                }
            },
            {
                test: /\.{png|svg|jpg}$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }]

            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtracPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPluging({
            patterns: [
                { from: 'src/assets', to: 'assets/', }
            ],

        }),
    ]

}