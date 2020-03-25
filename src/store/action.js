import {
	getGoodsList,
	getMerchantInfo,
	getMerchantStatus
} from 'Api/httpApi'
import {
	SAVE_GOODSLIST,
	SET_MERCHANTSTATUS,
	SET_MERCHANTINFO
} from 'Store/mutation-types.js'

export default {
    /**
     * 获取商品列表信息
     */
	async getGoodsListAction({
		state, commit
	}) {
		let res = await getGoodsList(null);
		// console.log(res, 999999);
		if (res && res.code === 200) {
			const info = res.data || {};
			const { list } = info
			commit(SAVE_GOODSLIST, list)
		}
	},
	/**
     * 获取用户入网状态
     */
	async getMerchantStatusAction({
		state, commit
	}) {
		let res = await getMerchantStatus(null);
		console.log('getMerchantStatus ', res);
		if (res && res.code === 200) {
			const info = res.data || {};
			const { status } = info
			commit(SET_MERCHANTSTATUS, status)
		}
	},
	/**
     * 获取用户我的入网信息
     */
	async getMerchantInfoAction({
		state, commit
	}) {
		let res = await getMerchantInfo(null);
		console.log('getMerchantInfo ', res);
		if (res && res.code === 200) {
			const info = res.data || {};
			commit(SET_MERCHANTINFO, info)
		}
	},
}