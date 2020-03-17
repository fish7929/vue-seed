import _ from "./underscore"
export default class CommonTool {
  static isFunction(obj) {
    return (Object.prototype.toString.call(obj) == '[object Function]');
  }
  static isArray(obj) {
    return (Object.prototype.toString.call(obj) == '[object Array]');
  }
  static isObject(obj) {
    return (Object.prototype.toString.call(obj) == '[object Object]');
  }
  static format(fmt, ...args) {
    return fmt.replace(/(\{(\d+)\})/g, function (match, firstCap, index) {
      return ((args[index] === undefined) ? match : args[index]);
    });
  }
  static qs(obj, cache) {
    var arr = [];
    function inner(obj, prefix) {
      for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) return;
        var v = obj[prop];
        if (!CommonTool.isArray(v)) {
          if (CommonTool.isObject(v)) inner(v, (prefix ? (prefix + '.' + prop) : prop));
          else arr.push(encodeURIComponent((prefix ? (prefix + '.') : '') + prop) + '=' + encodeURIComponent(v || ''));
        } else {
          _.each(v, (i, val) => {
            arr.push(encodeURIComponent((prefix ? (prefix + '.') : '') + prop + '[]') + '=' + encodeURIComponent(val || ''));
          });
        }
      }
    }
    inner(obj, '');
    if (cache && !obj['_']) {
      arr.push('_=' + encodeURIComponent(BUILD_NO));
    }
    return arr.length ? ('?' + arr.join('&')) : '';
  }

  static parseQs() {
    var s = window.location.search;
    var index = s.indexOf('?');
    var result = {};
    if (index == -1) return result;
    var arr = s.substr(index + 1).split('&');
    arr.forEach(function (item) {
      var equals = item.split('=');
      var key = decodeURIComponent(equals[0]);
      var val = decodeURIComponent(equals[1] || '');
      var i = 0;
      var splitting = key.split('.');
      var len = splitting.length;
      key = splitting[len - 1];
      var temp = result;
      if (len > 1) {
        for (; i < len - 1; i++) {
          if (!temp[splitting[i]] || !CommonTool.isObject(temp[splitting[i]])) temp[splitting[i]] = {};
          temp = temp[splitting[i]];
        }
      }
      if (key.substr(-2) != '[]') {
        temp[key] = val;
      } else {
        key = key.substr(0, key.length - 2);
        if (!temp[key]) temp[key] = [val];
        else temp[key].push(val);
      }
    });
    return result;
  }
  static b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }


  /*
   * @parma entry, 为 bundleLoad 中传递的 entry
  */
  static goBack(step = 1, entry) {
    const qs = CommonTool.parseQs()
    history.go(-step)
  }

  /**
  *  格式化姓名的样式
  * @param name 格式化的名称  如：岳*   岳*目
  * @returns {string}
  */
  static formatName(name) {
    name = name + '';
    var len = name.length;
    if (len >= 3) {
      var reg = /^(.).+(.)$/g;    //三字以上名称的生活
      name = name.replace(reg, '$1*$2');
    } else {
      var reg = /^(.).$/g;  //两位名称的生活
      name = name.replace(reg, '$1*');
    }
    return name;
  }
  /**
  *  格式化手机号码的样式
  * @param phone 格式化的手机号码 如： 188****0000
  * @returns {string}
  */
  static formatPhone(phone) {
    phone = phone + '';
    phone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    return phone;
  }
  /**
  *  格式化身份证的样式
  * @param idCard 格式化的手机号码 如： 334321******232321
  * @returns {string}
  */
  static formatIdCard(idCard) {
    idCard = idCard + '';
    idCard = idCard.replace(/(\d{6})\d{9}(\d{3})/, '$1******$2');
    return idCard;
  }
  /**
  *  格式化银行卡的样式
  * @param bankCard 格式化的银行卡 如： 6542*********7876
  * @returns {string}
  */
  static formatBankCard(bankCard) {
    bankCard = bankCard + '';
    bankCard = bankCard.replace(/(\d{4})\d{8,11}(\d{4})/, '$1******$2');
    return bankCard;
  }
  /**
  *  格式化金额样式
  * @param money 格式化的名称  30，000
  * @returns {string}
  */
  static formatMoney(money) {
    money = parseFloat(money);
    money = money.toFixed(2);
    money = money.toLocaleString();
    return money;
  }
  /**
  *  字符串去空格
  * @param str 需要格式化的数据
  * @returns {string}
  */
  static trimStr(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }
  /**
  * 判断是否在微信内部
  * @returns {boolean}
  */
  static isWeiXinPlatform() {
    var userAgent = navigator.userAgent.toLowerCase();
    var res = false;
    //来源判断
    if (userAgent.indexOf("micromessenger") > -1) {
      res = true;
    }
    return res;
  }
  /**
  * 动态设置页面标题
  * @param {string} title 页面标题名称
  */
  static setTitle(title) {
    //动态设置标题
    document.title = title;
    if (CommonTool.isWeiXinPlatform()) {
      const iframe = document.createElement('iframe');
      // iframe.src = "./favicon.ico";
      iframe.style.display = "none";
      iframe.addEventListener("load", handler, false);
      function handler() {
        setTimeout(function () {
          iframe.removeEventListener('load', handler, false);
          document.body.removeChild(iframe);
        }.bind(this), 0)
      }
      document.body.appendChild(iframe);
      window.addEventListener('hashchange', function () {
        window.location.reload();
      }, false);
    }
  }
  /**
  * 对Date的扩展，将 Date 转化为指定格式的String
  * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  * 例子：
  * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  */
  static formatTime(date, format) {
    var t = new Date(date);
    var tf = function (i) { return (i < 10 ? '0' : '') + i };
    return format.replace(/yyyy|MM|M|dd|d|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
        // break;
        case 'MM':
          return tf(t.getMonth() + 1);
        case 'M':
          return t.getMonth() + 1;
        // break;
        case 'mm':
          return tf(t.getMinutes());
        // break;
        case 'dd':
          return tf(t.getDate());
        case 'd':
          return t.getDate();
        // break;
        case 'HH':
          return tf(t.getHours());
        // break;
        case 'ss':
          return tf(t.getSeconds());
        // break;
      }
    });
  }
  /**
  * 获取url参数值
  */
  static getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var urlParam = location.href.split('?')[1];
    if (!urlParam) { return; }
    var r = urlParam.match(reg);
    if (r) {
      return unescape(r[2]);
    } else {
      return null;
    }
  }
  /**
  * 判断是否是IOS设备
  * @returns {boolean}
  */
  static isIOS() {
    return (/iphone|ipad|ipod/gi).test(navigator.appVersion);
  }
  /**
  * 判断是否是PC端
  * @returns {boolean}
  */
  static isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
  }
  /**
  * 根据localStorage属性 获取 存储的JSON对象
  * @param {localStorage属性} prototype 
  */
  static getLocalStorageObject(prototype) {
    var str = window.localStorage.getItem(prototype);
    var result = {};
    if (str && str != "") {
      result = JSON.parse(str);
    }
    return result;
  }
  /**
  * 保存对象到localStorage
  * @param {localStorage属性} prototype 
  * @param {需要保存的对象值} obj 
  */
  static setLocalStorageObject(prototype, obj) {
    var str = obj;
    if (typeof str === 'object') {
      str = JSON.stringify(obj)
    }
    window.localStorage.setItem(prototype, str);
  }
  /**
  * 根据键值获取保存到localStorage对象的值
  * @param {localStorage属性} prototype 
  * @param {需要获取对象的键值} key 
  */
  static getLocalStorageValue(prototype, key) {
    var obj = CommonTool.getLocalStorageObject(prototype);
    if (obj[key]) {
      return obj[key];
    }
    return null;
  }
  /**
  * 追加值到已经存在的localstorage
  * @param {localStorage属性} prototype 
  * @param {需要保存对象的键值} key 
  * @param {需要保存对象的值} value 
  */
  static addLocalStorageObject(prototype, key, value) {
    var obj = CommonTool.getLocalStorageObject(prototype);
    obj[key] = value;
    CommonTool.setLocalStorageObject(prototype, obj);
  }
  /**
  * 根据键值删除已经存在的localstorage对象值
  * @param {localStorage属性} prototype 
  * @param {需要保存对象的键值} key 
  */
  static delLocalStorageObject(prototype, key) {
    var obj = CommonTool.getLocalStorageObject(prototype);
    if (obj[key]) {
      delete obj[key];
    }
    CommonTool.setLocalStorageObject(prototype, obj);
  }
  /**
  * 判断对象是否为空
  * @param {判断的对象} obj 
  */
  static isEmptyObject(obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  }
  /**
  * 判断对象是否为json对象
  * @param {object} obj  判断的对象
  */
  static isJsonObject(obj) {
    var isjson = typeof (obj) === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
    return isjson;
  }
  /**
  * 判断字符串是否为json string
  * @param {string} str 
  */
  static isJsonString(str) {
    if (!str) {
      return false;
    } else if (str.indexOf("{") === 0 && str.lastIndexOf("}") === str.length - 1) {
      return true;
    }
    return false;
  }
  /**
  * 计算对象的长度
  * @param {any} obj  任何类型
  */
  static size(obj) {
    let num = 0;
    if (CommonTool.isJsonObject(obj)) {
      var arr = Object.keys(obj);
      num = arr.length;
    } else {
      num = obj.length || 0;
    }
    return num;
  }
  /**
   * 检测登录时间是否过期
   * @param {number} lastLoginTime 时间戳
   */
  static checkLoginDue(lastLoginTime) {
    let res = false;
    const currentTime = Date.now();  //当前的时间戳
    const _lastLoginTime = lastLoginTime ? lastLoginTime : currentTime;
    const nTime = currentTime - _lastLoginTime;
    const day = Math.ceil(nTime / (86400 * 1000));
    if (day > 7) {   //大于7天 就失效
      res = true;
    }
    return res;
  }

  /**
   * 设置新登录完成的跳转URL
   * @param {string} url 链接地址
   */
  static setLoginToUrl(url) {
    let _url = url;
    if (!_url) {
      const localUrl = location.href;
      _url = localUrl.split(location.host)[1];
      if (window.location.pathname == "/") {
        _url = "/";
      }
    }
    window.localStorage.setItem("LoginToUrl", _url);
  }

  /**
   * 获取登录完成的跳转URL
   */
  static getLoginToUrl() {
    return window.localStorage.getItem("LoginToUrl") || "/";
  }
  /**
  * 检查身份证的年龄， 18 - 55
  */
  static checkIdCardAge(idCard) {
    let res = true;
    const myDate = new Date();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();
    let age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
    if (idCard.substring(10, 12) < month || parseInt(idCard.substring(10, 12)) === month && idCard.substring(12, 14) <= day) {
      age++;
    }
    // if (age < 18 || age > 55) {
    if (age < 18) {
      res = false;
    }
    return res;
  }
  /**
   * 异步打开新窗口
   * @param {string} url 打开的链接
   */
  static asynOpennewWin(url) {
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('id', 'test-open-new-win');
    // 防止反复添加  
    if (!document.getElementById('test-open-new-win')) {
      document.body.appendChild(a);
    }
    a.click();
    //触发后立即删除
    setTimeout(() => {
      document.body.removeChild(a);
    }, 0);
  }

  /**
  * 动态加载JS
  * @param {string} url  加载的js  url
  * @param {function} callBack  加载完成的回调 default  null
  */
  static loadJs(url, callBack = null) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    head.appendChild(script);
    script.onload = function () {
      callBack && callBack();
    }
  }

  /**
    * 图片压缩
    * @param {object} file 图片文件对象
    * @param {object} options 压缩对象的参数如   { maxSide: 1280, quality: 0.8, maxSize: 300 }
    * @param {function} callback 回调方法
  */
  static photoCompress(file, options, callback) {
    let windowURL = window.URL || window.webkitURL;
    let maxSize = 200 * 1024;  //200kb
    // 图片最大的尺寸
    if (options && options.maxSize && options.maxSize > maxSize) {
      maxSize = options.maxSize * 1024;
    }
    if (windowURL.createObjectURL) {
      let dataURL = windowURL.createObjectURL(file);
      CommonTool.canvasDataURL(dataURL, options, callback);
    } else {
      let ready = new FileReader();
      /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
      ready.readAsDataURL(file);
      ready.onload = function (e) {
        let re = e.target.result;
        if (re.length <= maxSize) {
          options.quality = 1;  //保证图片质量不变不压缩
        }
        CommonTool.canvasDataURL(re, options, callback);
      }
    }
  }

  /**
   * canvas压缩图片 
   * @param {string} path 图片文件的路径
   * @param {object} obj 压缩对象的参数如   { maxSide: 1280, quality: 0.8, maxSize: 300 }
   * @param {function} callback 回调方法
   */
  static canvasDataURL(path, obj, callback) {
    let img = document.createElement('img');
    img.src = path;
    img.onload = function () {
      let that = this;
      // 默认按比例压缩
      let w = that.width,
        h = that.height,
        scale = w / h;
      if (w > h) { //横屏的时候
        //传递的宽度固定 1280 ， 如果原始宽度大于1280的才适配
        if (obj.maxSide && obj.maxSide < w) {
          w = obj.maxSide;
        }
        h = obj.height || (w / scale);
      } else {  //竖屏的时候
        //传递的最大边宽度固定 1280 ， 如果原始高度度大于1280的才适配
        if (obj.maxSide && obj.maxSide < h) {
          h = obj.maxSide;
        }
        w = obj.width || (h * scale);
      }
      let quality = 0.8;  // 默认图片质量为0.8
      //生成canvas
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      // 创建属性节点
      let anw = document.createAttribute("width");
      anw.nodeValue = w;
      let anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(that, 0, 0, w, h);
      // 图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality;
      }
      // quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL('image/jpeg', quality);
      // 回调函数返回base64的值
      callback && callback(base64);
    }
  }
  /**
   * 获取文件的创建url路径
   * @param {object} file 文件对象
   */
  static getFileAbsolutePath(file) {
    let url = null;
    if (window.createObjectURL != undefined) {
      // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }
}
