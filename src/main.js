import Vue from 'vue';
import VueRouter from 'vue-router';
import './utils/globalVar';
import router from './router';
import store from './store/index';
import AppModal from './plugins/appModal/index';
import './utils/rem';
//安装应用插件
Vue.use(AppModal);
//router 组件实例化
Vue.use(VueRouter);
//实例化app
const MyVue = new Vue({
    router,
    store,
}).$mount('#app');
window.MyVue = MyVue;