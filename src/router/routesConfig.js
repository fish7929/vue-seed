import * as BundleLoad from "./bundleLoad";

//聚合路由
export default [{
	path: '/',
	component: BundleLoad.App, //顶层路由，对应index.html
	children: [ //二级路由。对应App.vue
		//地址为空时跳转home页面
		{
			path: '',
			redirect: '/shop'
		},
		//商铺详情页
		{
			path: '/shop',
			component: BundleLoad.Shop,
			meta: {
				title: "花生微店",
				keepAlive: true,   //是否一致存在
				requireAuth: true   //是否需要登录 
			}
		},
		//活动页面
		{
			path: '/activity',
			component: BundleLoad.Activity,
			meta: {
				title: "活动",
				requireAuth: true   //是否需要登录 
			}
		},
		//我的页面
		{
			path: '/my',
			component: BundleLoad.My,
			meta: {
				title: "我",
				requireAuth: true   //是否需要登录 
			}
		},
		//登录注册页
		{
			path: '/login',
			component: BundleLoad.Login,
			meta: {
				title: "登录"
			}
		},
		//产品详情
		{
			path: 'goods/:id', //订单备注
			component: BundleLoad.Goods,
			name: 'goods',
			meta: {
				title: "商品详情",
				requireAuth: true   //是否需要登录 
			}
		}
	]
}];