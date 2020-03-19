const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//判断是否是dev 模式
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    module: {
        rules: [
            {
                test: /\.js|.jsx$/,
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
                    devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
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
        extensions: ['.js', '.jsx', '.vue', '.less', '.css', '.scss'],
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
            Images: path.resolve(__dirname + '/src/assets/images/'),
            '@': path.resolve('src')
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash:8].css',
            chunkFilename: "[id].[hash:8].css"
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}