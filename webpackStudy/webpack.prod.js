 const merge = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');
 const webpack = require('webpack');
 
 module.exports = merge(common, {
     plugins: [
        // new UglifyJSPlugin()
        new UglifyJSPlugin({
            sourceMap: true
        }), //生产环境source map

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }) //指定环境
     ]
 });