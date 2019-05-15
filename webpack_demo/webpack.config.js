const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')   //相对路径转绝对
    },
    module: {
        //noParse: /jquery|lodash/, //不进行webpack处理
        rules: [
            {
                test: /\.(sc|c|sa)ss$/,
                //处理顺序从右至左
                use: ['style-loader',
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
                                // require("postcss-flexbugs-fixes"),
                                // require("postcss-preset-env")({
                                //     autoprefixer: {
                                //         flexbox: "no-2009"
                                //     },
                                //     stage: 3
                                // })
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
    }
}