// 路径模块
const path = require('path')
// 优化JS
const Terser = require('terser-webpack-plugin')
// 优化CSS
const OptimizerCss = require('optimize-css-assets-webpack-plugin')
// 抽离CSS为单独文件
const MiniCssExtract = require('mini-css-extract-plugin')
// 界面生成插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack模块
const webpack = require('webpack')
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.ts',
        gui: './src/gui.ts'
    },
    output: {
        filename: './js/[name]_[hash:6].js',
        path: path.resolve(__dirname, './build')
    },
    devServer: {
        port: 8080,
        open: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.less', 'json']
    },
    devtool: 'cheap-eval-source-map',
    watch: true,
    watchOptions: {
        poll: 100,
        aggregateTimeout: 500,
        ignored: /node_modules/
    },
    // 代码优化
    optimization: {
        minimizer: [
            new Terser({
                test: /\.jsx?$/,
                include: /src/,
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizerCss()
        ],
        splitChunks: {
            cacheGroups: {
                commen: {
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2,
                    name: 'commen'
                },
                vendor: {
                    priority: 1,
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    corejs: 3
                                }
                            ]
                        ]
                    }
                },
                include: /src/
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: /src/
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtract.loader
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ],
                include: /src/
            },
            {
                test: /\.jpg|png|jpeg|ttf|woff|woff2|eot/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10* 1024,
                        esModule: false,
                        name: '[name]_[hash:6].[ext]',
                        outputPath: 'assets'
                    }
                }
            },
            {
                test: /\.html/,
                use: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtract({
            filename: './css/[name]_[hash:6].css',
            chunkFilename: './css/[name]_[hash:6].css',
            ignoreOrder: false
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            chunks: ['index', 'vendor']
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'gui.html',
            chunks: ['gui', 'vendor']
        }),
        new webpack.BannerPlugin('make by Herve At 2020-05-17')
    ]
}