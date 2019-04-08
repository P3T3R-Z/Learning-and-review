const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');



module.exports = {
    mode: 'production',

    //entry: './src/index.js',
    // entry: {
    //     main: './src/index.js',
    //     other: './src/index2.js' //多个入口
    // },
    entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map', //sourceMap

    devServer: {
        contentBase: './dist', //告诉服务器dev server已dist 目录下的文件作为可访问的文件, 配合webpack-dev-server
        hot: true
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ //替换html内容插件
            title: '123'
        }),
        new webpack.NamedModulesPlugin(), //查看要修补的依赖
        new webpack.HotModuleReplacementPlugin() //热模块替换插件
    ],

    output: {
        filename: '[name].js', //占位符保证每个文件具有唯一名称
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/' //使得静态文件能够在'/'目录下正确访问
    },

    //loader 运行其他类型文件
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    'file-loader'
                ],
                sideEffects: false   //设为false后dead code将会被删除
            }
        ]
    }
}