import vue from 'vue';
import Modal from "./modal.vue";

// 组件构造器，构造出一个 vue组件实例
let instance = null;
const ModalConstructor = vue.extend(Modal)
let initInstance = () => {
    if (!instance) {
        instance = new ModalConstructor({
            el: document.createElement('div')
        });
        document.body.appendChild(instance.$el);
    }
}
//toast 方法
const toast = function (msg, duration = 3, cls = "") {
    initInstance();
    instance.toastConfig.message = msg;
    instance.cls = cls;  //自定义样式
    instance.type = "TOAST";
    instance.isShow = true;
    setTimeout(() => {
        instance.isShow = false;
    }, duration * 1000);
}
//loading 方法
const loading = function (msg, duration = 120, cls = "") {
    initInstance();
    instance.loadingConfig.message = msg;
    instance.cls = cls;  //自定义样式
    instance.isShow = true;
    instance.type = "LOADING";
    // 过渡时间
    setTimeout(() => {
        instance.isShow = false;
    }, duration * 1000)
}
// hide 方法
const hide = function () {
    instance.isShow = false;
}
//alert 方法
const alert = function (msg, options = {}) {
    initInstance();
    instance.alertConfig.message = msg;
    instance.cls = options.cls || '';  //自定义样式
    instance.type = "ALERT";
    instance.isShow = true;
    instance.alertConfig = { ...instance.alertConfig, ...options };
}

//Confirm 方法
const confirm = function (msg, options = {}) {
    initInstance();
    instance.confirmConfig.message = msg;
    instance.cls = options.cls || '';  //自定义样式
    instance.type = "CONFIRM";
    instance.isShow = true;
    instance.confirmConfig = { ...instance.confirmConfig, ...options };
}
const AppModal = {
    loading,
    hide,
    toast,
    alert,
    confirm
};
//注册方法
AppModal.install = vue => {
    //toast 方法
    vue.prototype.$toast = toast;
    //loafing 方法
    vue.prototype.$loading = loading;
    //alert 方法
    vue.prototype.$alert = alert;
    //Confirm 方法
    vue.prototype.$confirm = confirm;
    //全局的隐藏方法
    vue.prototype.$hideModal = hide;
}

export default AppModal;