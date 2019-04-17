 const path = require('path');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const WorkboxPlugin = require('workbox-webpack-plugin');
 
 module.exports = {
     entry: {
         app: './src/index.js',
         another: './src/index2.js'
     },
     plugins: [
         new CleanWebpackPlugin(),
         new HtmlWebpackPlugin({
             title: 'Production'
         }),
         new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast 
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true
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
     },
     optimization: {
         splitChunks: {
             chunks: 'all'
         }
     }  //提取公共代码
 };