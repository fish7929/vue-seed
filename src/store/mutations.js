import {
	SAVE_USERINFO,
	GET_USERINFO,
	SAVE_GOODSLIST,
	SET_MERCHANTSTATUS,
	SET_MERCHANTINFO
} from 'Store/mutation-types.js';
import CommonTool from 'Utils/commonTool';

export default {
	// 记录用户信息
	[SAVE_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		CommonTool.setLocalStorageObject('CURRENT_USER', info);
	},
	//获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.token !== info.token)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = { ...info };
		} else {
			state.userInfo = null;
		}
	},
	//保存商品信息
	[SAVE_GOODSLIST](state, info) {
		state.goodsList = info;
	},
	//保存用户入网状态
	[SET_MERCHANTSTATUS](state, info) {
		state.merchantStatus = info;
	},
	//保存用户入网信息
	[SET_MERCHANTINFO](state, info) {
		state.merchantInfo = info;
	},
}
