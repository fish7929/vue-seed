import Modal from "./modal.vue";

const AppModal = {}
AppModal.install = vue => {
    //第一步 创建实例  挂载 
    const ModalCom = vue.extend(Modal);
    const ins = new ModalCom();
    ins.$mount(document.createElement('div'))
    document.body.appendChild(ins.$el)
    //第二步 注册方法

    //toast 方法
    vue.prototype.$toast = (msg, duration = 3, cls = "") => {
        ins.toastConfig.message = msg;
        ins.cls = cls;  //自定义样式
        ins.type = "TOAST";
        ins.isShow = true;
        setTimeout(() => {
            ins.isShow = false;
        }, duration * 1000);
    }

    //loafing 方法
    vue.prototype.$loading = (msg, duration = 120, cls = "") => {
        ins.loadingConfig.message = msg;
        ins.cls = cls;  //自定义样式
        ins.type = "LOADING";
        ins.isShow = true;
        setTimeout(() => {
            ins.isShow = false;
        }, duration * 1000);
    }

    //alert 方法
    vue.prototype.$alert = (msg, options = {}) => {
        ins.alertConfig.message = msg;
        ins.cls = options.cls || '';  //自定义样式
        ins.type = "ALERT";
        ins.isShow = true;
        ins.alertConfig = { ...ins.alertConfig, ...options };
    }

    //Confirm 方法
    vue.prototype.$confirm = (msg, options = {}) => {
        ins.confirmConfig.message = msg;
        ins.cls = options.cls || '';  //自定义样式
        ins.type = "CONFIRM";
        ins.isShow = true;
        ins.confirmConfig = { ...ins.confirmConfig, ...options };
    }

    //全局的隐藏方法
    vue.prototype.$hideModal = () => {
        ins.isShow = false;
    }
}

export default AppModal;