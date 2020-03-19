const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const port = 8080;
module.exports = env => {
    return Merge(baseConfig, {
        entry: [
            'babel-polyfill',
            path.join(__dirname, 'src/main.js')
        ],
        output: {
            filename: "app.[hash:8].js",
            chunkFilename: '[name].[chunkhash:8].chunk.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        devServer: {
            contentBase: path.resolve(__dirname),
            compress: true,
            historyApiFallback: true,
            hot: true,
            inline: true,
            port: port,
            host: '0.0.0.0',
            disableHostCheck: true,
            proxy: [  //代理数据请求
                {
                    context: ['/apiA/**', '/apiB/**'],
                    target: 'https://www.text.com/',
                    secure: false
                }
            ]
        },
        devtool: "source-map",
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html', // 注意路径为根目录下的路径
                filename: 'index.html', // 打包后也叫做 index.html
                minify: {     // 压缩这个html文件(主要是对HTML文件进行压缩)
                    removeAttributeQuotes: true,        // 删除这个html文件的双引号
                    collapseWhitespace: true      // 变成一行
                },
                hash: true,
                gIo: false,
                ga: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                },
                'BUILD_ENV': JSON.stringify(env)
            }),
            new webpack.HotModuleReplacementPlugin(),
            new OpenBrowserPlugin({ url: 'http://localhost:' + port })
        ]
    })
}

