import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import data from 'Stores/getdata';
import App from "Components/demo/demo.vue";
import "Styles/app.scss";
Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
    modules: {
        data
    }
});
const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };
const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

new Vue({
    render: (h) => h(App),
    store,
    router
}).$mount('#app');