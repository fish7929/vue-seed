import app from '../App';
export const App = app;  //导出App 组件 
//实现异步加载
export const Activity = r => require.ensure([], () => r(require('../pages/activity')), 'activity');
//实现异步加载
export const My = r => require.ensure([], () => r(require('../pages/my')), 'my');
//实现异步加载
export const Shop = r => require.ensure([], () => r(require('../pages/shop')), 'shop');
//实现异步加载
export const Login = r => require.ensure([], () => r(require('../pages/login')), 'login');
//实现异步加载
export const Goods = r => require.ensure([], () => r(require('../pages/goods')), 'goods');
//实现异步加载
export const Test = r => require.ensure([], () => r(require('../pages/test')), 'test');
//实现异步加载
export const NotFound = r => require.ensure([], () => r(require('../pages/404')), 'notFound');
//实现异步加载
export const Orders = r => require.ensure([], () => r(require('../pages/orders')), 'orders');
