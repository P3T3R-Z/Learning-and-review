const path = require('path');

module.exports = {
    mode: 'production',

    //entry: './src/index.js',
    entry: {
        main: './src/index.js',
        other: './src/index2.js'    //多个入口
    },

    output: {
        filename: '[name].js',   //占位符保证每个文件具有唯一名称
        path: path.resolve(__dirname, 'dist')
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