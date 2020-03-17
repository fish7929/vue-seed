import VueRouter from 'vue-router';
import { routerMode } from '../config/env';
import routes from "./routesConfig";

const router = new VueRouter({
    routes,
    mode: routerMode,
    strict: process.env.NODE_ENV !== 'production',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return { x: 0, y: to.meta.savedPosition || 0 }
        }
    }
});
// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        //需要登录
        const currentUser = CommonTool.getLocalStorageObject('CURRENT_USER');
        if (currentUser && !CommonTool.isEmptyObject(currentUser) && currentUser.token) { // 判断当前的token是否存在 ； 登录存入的token
            next();
        }
        else {
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
});
export default router;