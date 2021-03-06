const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    // https://webpack.js.org/loaders/babel-loader
    //  npm install -D babel-loader @babel/core @babel/preset-env webpack
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, // 加快编译速度，不包含node_modules文件夹内容
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true //默认false, true后允许缓存loader的执行结果,提高编译速度
            }
          }
          // , {
          //   loader: 'eslint-loader',
          //   options: {
          //     fix: true
          //   }
          // }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [autoprefixer({ browsers: ['> 0.15% in CN'] })]
            }
          }, {
            loader: 'sass-loader'
          }
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }, {
        test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
        use: [
          'file-loader', {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name][hash].css', chunkFilename: '[id][hash].css' }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      filename: 'index.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: false, // 移除属性的引号
      }
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /src/,
        cache: true,
        exclude: /node_modules/
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
