const path = require('path');

const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = env => {
    const isDevelopment = env.NODE_ENV === 'development';

    return {
        mode: isDevelopment ? 'development' : 'production',
        entry: {
            bundle: [
                isDevelopment && 'webpack-dev-server/client',
                isDevelopment && 'webpack/hot/dev-server',
                './src/index.ts'
            ].filter(Boolean)
        },
        output: {
            filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        devServer: {
            hot: true,
            contentBase: path.join(__dirname, 'dist'),
            port: 4000
        },
        devtool: 'source-map',
        optimization: {
            minimize: !isDevelopment,
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin(),
            ],
            runtimeChunk: 'single',
            splitChunks: {
                minSize: 0,
                cacheGroups: {
                    'vendor': {
                        name: 'vendor',
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'initial',
                        priority: 1
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    use: [
                        'babel-loader',
                        'ts-loader'
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'resolve-url-loader',
                        'sass-loader'
                    ],
                },
                {
                    test: /\.(png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'images/'
                            },
                        },
                    ],
                },
                {
                    test: /\.ttf$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/'
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new CleanWebpackPlugin(),
            isDevelopment && new webpack.HotModuleReplacementPlugin(),
            new CopyPlugin({
                patterns: [
                    { from: './public/_redirects'},
                    { from: './public/fonts', to: './fonts' },
                    { from: './public/images', to: './images' }
                ],
            }),
            new MiniCssExtractPlugin({
                filename: isDevelopment ? 'index.css' : 'index.[contenthash].css'
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
                inject: 'body',
                chunks: ['bundle', 'vendor']
            }),
        ].filter(Boolean),
    }
};