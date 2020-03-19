const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const envConfig = require("./src/config/env.js");
const Merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
//压缩优化
const optimization = {
    runtimeChunk: {
        name: 'manifest'
    },
    minimizer: [
        new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
                // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            }
        }),
    ], // [new UglifyJsPlugin({...})]
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
            vendor: {
                name: 'vendor',
                chunks: 'initial',
                priority: -10,
                reuseExistingChunk: false,
                test: /node_modules\/(.*)\.js/
            },
            styles: {
                name: 'styles',
                test: /\.(scss|css)$/,
                chunks: 'all',
                minChunks: 1,
                reuseExistingChunk: true,
                enforce: true
            }
        }
    }
}
//去掉警告，和配置可以压缩的最大文件体积
const performance = {
    hints: 'warning',
    //入口起点的最大体积 整数类型（以字节为单位）
    maxEntrypointSize: 50000000,  //1024  1KB
    //生成文件的最大体积 整数类型（以字节为单位 300k）
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
    }
}

module.exports = env => {
    const curEnv = env || "local";
    const assetsUrl = envConfig.getAssetsUrl(curEnv, "/");
    return Merge(baseConfig, {
        entry: {
            app: path.resolve(__dirname, 'src/main.js'),
            vendor: [
                'vue',
                'vuex',
                'vue-router'
            ],
            // common: [
            //   'prius','zepto-webpack', 
            //   'JS/utils/common-tool', 'JS/utils/httpUtil'
            // ],
        },
        output: {
            filename: "app.[chunkhash:8].js",
            chunkFilename: '[name].[chunkhash:8].chunk.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: assetsUrl
        },
        optimization: optimization,
        performance: performance,
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './index.html',
                // htmlWebpackPlugin: {  //为了动态设置 js  css  如： <% for (var chunk in htmlWebpackPlugin.files.chunks) { %> src="<%=htmlWebpackPlugin.files.chunks[chunk].entry %>"
                //     'files': {    <% for (var css in htmlWebpackPlugin.files.css) { %> <link href="<%=htmlWebpackPlugin.files.css[css] %>" rel="stylesheet"> <% } %>
                //         'css': ['app.css'],
                //         'js': ['index.js', 'common.js']
                //     }
                // },
                minify: { // 压缩HTML文件
                    removeComments: true, // 移除HTML中的注释
                    collapseWhitespace: true, // 删除空白符与换行符
                    removeAttributeQuotes: true,  //删除熟悉引号
                    minifyCSS: true// 压缩内联css
                },
                chunksSortMode: function (chunk1, chunk2) {
                    var orders = ['common', 'vendor', 'debug', 'app'];   //根据entry 来确定， 做优先级排序
                    var order1 = orders.indexOf(chunk1.names[0]);
                    var order2 = orders.indexOf(chunk2.names[0]);
                    if (order1 > order2) {
                        return 1;
                    } else if (order1 < order2) {
                        return -1;
                    } else {
                        return 0;
                    }
                },
                // faviconShow: true,   //附带的参数可以去 html 里面动态设置 如 <% if(htmlWebpackPlugin.options.faviconShow) { %>
            }),
            new ManifestPlugin({
                publicPath: assetsUrl
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
                cssProcessorOptions: {
                    discardComments: { removeAll: true }
                },
                canPrint: true//是否将插件信息打印到控制台
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                'BUILD_ENV': JSON.stringify(curEnv)
            }),
        ]
    })
}