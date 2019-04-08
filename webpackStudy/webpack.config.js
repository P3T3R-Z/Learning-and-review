const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',

    //entry: './src/index.js',
    entry: {
        main: './src/index.js',
        other: './src/index2.js' //多个入口
    },
    devtool: 'inline-source-map', //sourceMap

    devServer: {
        contentBase: './dist'
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ //替换html内容插件
            title: '123'
        })
    ],

    output: {
        filename: '[name].js', //占位符保证每个文件具有唯一名称
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'     //使得静态文件能够在localhost:3000下正确访问
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
                ]
            }
        ]
    }
}