const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//从命令行参数获取值
const NodeEnv = process.env.NODE_ENV || 'development';

module.exports = env => {
    // console.log(env, 788);
    const curEnv = env || 'local';
    return {
        entry: ['babel-polyfill', path.join(__dirname, 'src/main.js')],
        output: {
            filename: NodeEnv === 'development' ? "app.[hash:8].js" : "[name].[chunkhash:8].js",
            chunkFilename: NodeEnv === 'development' ? '[name].[chunkhash:8].chunk.js' : '[name].[chunkhash:8].chunk.js',
            path: path.join(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        NodeEnv === 'development' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]?[hash]',
                            limit: 25000,
                            esModule: false
                        }

                    }
                },
                {
                    test: /\.svg$/,
                    include: [
                        /node_modules/,
                        //   require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // antd-mobile 内置svg
                        path.resolve(__dirname, 'src/assets/images'),             // 业务代码本地私有 svg 存放目录
                        path.resolve(__dirname, 'src/components')                 // 本地通用组件 svg 存放目录
                    ],
                    loader: "svg-sprite-loader",
                },
            ]
        },
        resolve: {
            extensions: ['.js', '.vue', '.less', '.css', '.scss'],
            modules: ["node_modules"],
            alias: {
                vue: 'vue/dist/vue.min.js',
                Components: path.resolve(__dirname + '/src/components/'),
                Store: path.resolve(__dirname + '/src/store/'),
                Api: path.resolve(__dirname + '/src/api/'),
                Config: path.resolve(__dirname + '/src/config/'),
                Pages: path.resolve(__dirname + '/src/pages/'),
                Plugins: path.resolve(__dirname + '/src/plugins/'),
                Styles: path.resolve(__dirname + '/src/styles/'),
                Utils: path.resolve(__dirname + '/src/utils/'),
                Images: path.resolve(__dirname + '/src/assets/Images/'),
                '@': path.resolve('src')
            }
        },
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
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(NodeEnv)
                },
                'BUILD_ENV': JSON.stringify(curEnv)
            }),
            new MiniCssExtractPlugin({
                filename: NodeEnv === 'development' ? '[name].css' : '[name].[chunkhash:8].css',
                chunkFilename: "[id].css"
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ],
    }
}

//生成环境
if (NodeEnv === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            },
            canPrint: true//是否将插件信息打印到控制台
        })
    ])
} else {   //测试环境
    module.exports.devtool = '#eval-source-map';
    module.exports.devServer = {
        historyApiFallback: true,
        overlay: true,
        host: '0.0.0.0',
        disableHostCheck: true
    }
}