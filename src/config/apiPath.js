import envConfig from "./env";

const apiHost = envConfig.getApiHost();
const nodeApiHost = envConfig.getNodeApiHost();

const api = {
  /**
  * 验证码  post
  */
  "validationCode": apiHost + "/vdian/login/sendSmsCode",
  /**
  * 登录  post
  */
  "login": apiHost + "/vdian/login/mobileAuth",
  /**
  * 登出
  */
  "logout": apiHost + "/vdian/login/logout",
  /**
  * 上传图片  post
  * 接口文档：
  */
  "uploadPic": apiHost + "/vdian/upload/pic",
  /**
  * 获取商品列表
  * 接口文档：
  */
  "getProductList": apiHost + "/vdian/commodity/get",
  /**
  * 获取个人信息
  * 接口文档：
  */
  "getUserInfo": apiHost + "/vdian/merch/get",
  /**
  * 查询入网状态
  * 接口文档：
  */
  "getMerchantStatus": apiHost + "/vdian/merch/queryMerchantStatus",
  /**
  * 入网  post
  * 接口文档：
  */
  "personNetIn": apiHost + "/vdian/merch/personNetIn",
  /**
  * 下单  post
  * 接口文档：
  */
  "createOrder": apiHost + "/vdian/order/create",
  /**
  * 更换银行卡  post
  * 接口文档：
  */
  "changeBankCard": apiHost + "/vdian/merch/updateSettleCard",
  /**
  * 查询支持银行卡列表
  * 接口文档：
  */
  "getBankList": apiHost + "/vdian/bank-codes/get",
  /**
  * 获取交易订单列表
  * 接口文档：
  */
  "getDealOrders": apiHost + "/vdian/order/list",
  /**
  * 获取结算订单列表
  * 接口文档：
  */
  "getClosingOrders": apiHost + "/vdian/order/querySettleRecord",
  /**
   * 获取单笔打款状态
   * 接口文档：
   */
  "getClosingOrderStatus": apiHost + "/vdian/order/querySettleRemitStatus",
};

const nodeApi = {
  /**
  * 点击按钮
  */
  "activityApplication": nodeApiHost + "/application"
};

export default {
  ...api,
  ...nodeApi
};

