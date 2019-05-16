const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //生产css文件插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')  //css压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //js压缩
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')   //相对路径转绝对
    },
    module: {
        noParse: /lodash/,
        rules: [
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                use: [
                    //'file-loader', //解析文件loader
                    {
                        loader: 'url-loader',   //代替fileloader,在limit下以base64代替
                        options: {
                            limit: 8192   
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(sc|c|sa)ss$/,
                //处理顺序从右至左
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: "postcss",
                            sourceMap: true,
                            plugins: () => [
                                require('autoprefixer')({ browsers: 'last 5 version' })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',  //设置css输出文件名
            chunkFilename: '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            title: 'webpack练习',
            filename: 'index.html',  //生成的入口
            template: path.resolve(__dirname, 'src/index.html'),  //编译入口模板
            minify: {
                collapseWhitespace: true,  //折叠空白
                removeComments: true, //移除注释
                removeAttributeQuotes: false //移除属性的引号
            }
        }),
        new CleanWebpackPlugin()  //2.0版本中只接受object
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new UglifyJsPlugin({
                include: /\/src/,
                cache: true,
                exclude: /\/node_modules/
            })
        ]
    }
}