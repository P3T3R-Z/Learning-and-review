const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //生产css文件插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')  //css压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //js压缩

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')   //相对路径转绝对
    },
    module: {
        noParse: /lodash/,
        rules: [

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
        })
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