 const path = require('path');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
     entry: {
         app: './src/index.js'
     },
     plugins: [
         new CleanWebpackPlugin(),
         new HtmlWebpackPlugin({
             title: 'Production'
         })
     ],
     output: {
         filename: '[name].bundle.js',
         path: path.resolve(__dirname, 'dist')
     },
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
                 sideEffects: false //设为false后dead code将会被删除
             }
         ]
     }
 };