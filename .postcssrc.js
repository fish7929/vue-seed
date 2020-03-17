
module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'autoprefixer': {
            overrideBrowserslist: ['> 1%', 'last 4 versions']
        },
        'postcss-plugin-px2rem': {
            rootValue: 100, //vant-UI的官方根字体大小是37.5  这里以750为例
            propWhiteList: [],
            propList: ["*"],
            selectorBlackList: []
        }
    }
}