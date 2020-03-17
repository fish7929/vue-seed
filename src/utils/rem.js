// viewport 设置
// 针对原来高清方案的基础, 增加了根据屏幕宽度计算不同font-size 来达到对不同屏幕的适配
(function (doc, win, baseFontSize, fontscale) {
    win.flex = function () {
        var targetWidth = 375;
        var screenWidth = win.screen.width;
        var _baseFontSize = (baseFontSize || 100) * screenWidth / targetWidth;
        var _fontscale = fontscale || 1;
        var ua = navigator.userAgent;
        var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
        var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
        var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
        var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
        var dpr = win.devicePixelRatio || 1;
        if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
            //在部分4.3及以下安卓机型中，screen.width是物理像素宽度，暂时没有找到准确判断的方法，所以不做针对375宽度的缩放
            _baseFontSize = baseFontSize || 100;
            // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
            dpr = 1;
        }
        var scale = 1 / dpr;

        var metaEl = doc.querySelector('meta[name="viewport"]');
        if (!metaEl) {
            metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            doc.head.appendChild(metaEl);
        }
        metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
        doc.documentElement.style.fontSize = _baseFontSize / 2 * dpr * _fontscale + 'px';
    };
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, flex, false);
    doc.addEventListener('DOMContentLoaded', flex, false);
})(document, window, 100, 1);