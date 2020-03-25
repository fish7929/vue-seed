import HttpUtil from '../utils/httpUtil';
import ApiPath from '../config/apiPath';

/**
 * 获取用户登录验证码
 * @param {String} mobile 手机号  
 */
export const getAuthCode = (mobile) => HttpUtil.post(ApiPath.validationCode, { mobile });

/**
 * 用户登录
 * @param {Object} params {mobile, mobileCode}  用户登录的参数
 */
export const login = (params) => HttpUtil.post(ApiPath.login, params);

/**
 * 获取商品列表
 * @param {Object} params  请求的参数
 */
export const getGoodsList = (params) => HttpUtil.get(ApiPath.getProductList, params);

/**
 * 获取个人入网状态
 * @param {Object} params  请求的参数
 */
export const getMerchantStatus = (params) => HttpUtil.get(ApiPath.getMerchantStatus, params);

/**
 * 获取个人入网信息
 * @param {Object} params  请求的参数
 */
export const getMerchantInfo = (params) => HttpUtil.get(ApiPath.getUserInfo, params);

/**
 * 获取订单记录
 * @param {Object} params  请求的参数
 */
export const getOrderRecords = (params) => HttpUtil.get(ApiPath.getDealOrders, params);