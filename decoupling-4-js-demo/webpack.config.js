const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].[hash:8].bundle.js"
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve('./src/'),
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    // 按需引入需要使用polyfill
                                    // useBuiltIns: 'usage',
                                    // 解决warn
                                    corejs: { version: 3 },
                                    // 指定兼容性处理哪些浏览器
                                    targets: {
                                        "chrome": "58",
                                        "ie": "9",
                                    }
                                }
                            ]
                        ],
                        cacheDirectory: true, // 开启babel缓存
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader',
                ]
            },
            {
                test:/\.(jpg|png|jpeg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 2 * 1024,
                    name: "[name].[hash:10].[ext]",
                    outputPath: "images",
                    esModule: false
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new webpack.DefinePlugin({
            "BASE_URL": "'/'" // 不能是"/"，会报错的【SyntaxError: Invalid regular expression: missing /】
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
        }),
    ],
    devServer: {
        open: false,
        compress: true,
        port: 8887,
        hot: true
    }
};