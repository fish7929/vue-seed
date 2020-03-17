import Vue from 'vue';
import VueRouter from 'vue-router';
import './utils/globalVar';
import router from './router';
import store from './store/index';
import './utils/rem';
//router 组件实例化
Vue.use(VueRouter);
//实例化app
new Vue({
    router,
    store,
}).$mount('#app');