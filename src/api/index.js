import request from '@/common/js/request'

export function findStyleColor() {
  return request({
    url: '/find/findStyleColor',
    method: 'post'
  })
}
console.log(12312);

export function findMyOrders(parames) {
  console.log(parames)
  return request({
    url: '/find/findMyOrders',
    method: 'post',
    params: parames
  })
}
/**
 * 获取商品和主题色
 * @param {} data 不用传值 传个{}就可以
 */

export function findContainers(parames = {}) {
  return request({
    url: '/find/findContainers',
    method: 'post',
    params: parames
  })
}

/**
 * 查询商品分类
 * @param {} data 不用传值 传个{}就可以
 */

export function findProductClass(parames = {}) {
  return request({
    url: '/find/findProductClass',
    method: 'post',
    params: parames
  })
}

/**
 * 获取用户信息
 * @param {} data 不用传值 传个{}就可以
 */

export function findUserInfo(parames = {}) {
  return request({
    url: '/find/findUserInfo',
    method: 'post',
    params: parames
  })
}

/**
 * 更改用户信息
 * @param {} data 不用传值 传个{}就可以
 */

export function updateUserInfo(parames = {}) {
  return request({
    url: '/find/updateUserInfo',
    method: 'post',
    params: parames
  })
}

export function findDiscountUserMoney(parames = {}) {
  return request({
    url: '/find/findDiscountUserMoney',
    method: 'post',
    params: parames
  })
}

/**
 * 查询用户代价劵
 * @param {} data 不用传值 传个{}就可以
 */
export function findUserCode(parames = {}) {
  return request({
    url: '/find/findUserCode',
    method: 'post',
    params: parames
  })
}

/**
 * 微信支付
 * @param {Number} boxNum      柜门序号(1-28)
 * @param {Number} productId   商品ID
 * @param {Number} price       下单金额
 * @param {Number} mcId        货柜ID
 */
export function wxPay(parames = {}) {
  return request({
    url: '/pay/wxPay',
    method: 'post',
    data: parames
  })
}

/**
 * 支付宝支付
 * @param {Number} boxNum      柜门序号(1-28)
 * @param {Number} productId   商品ID
 * @param {Number} price       下单金额
 * @param {Number} mcId        货柜ID
 */
export function zfbzf(parames = {}) {
  return request({
    url: '/pay/zfbzf',
    method: 'post',
    data: parames
  })
}

/**
 * 获取商品详情
 * @param {Number} pid   商品id
 */
export function findProductById(parames = {}) {
  return request({
    url: '/find/findProductById',
    method: 'post',
    params: parames
  })
}

/**
 * 查询售货机关注二维码和文字
 * @param {} data 不用传值 传个{}就可以
 */
export function wxTest(parames = {}) {
  return request({
    url: '/wxTest/test',
    method: 'post',
    params: parames
  })
}

/**
 * 首页系统通知
 *
 *
 */
export function findVendorBroadcast(parames) {
  return request({
    url: '/find/findVendorBroadcast',
    method: 'post',
    params: parames
  })
}
/**
 * 限购查询
 *
 *
 */
export function findOrderPurchaseLimitation(parames) {
  return request({
    url: '/find/findOrderPurchaseLimitation',
    method: 'post',
    params: parames
  })
}

/**
 * 查询用户信息  用于判断VIP请求条件
 *
 */

export function vendorLoginfind(parames) {
  return request({
    url: '/find/vendorLoginfind',
    method: 'post',
    params: parames
  })
}
/**
 * 达到VIP条件请求数据
 *
 */

export function findVipProduct(parames) {
  return request({
    url: '/find/findVipProduct',
    method: 'post',
    params: parames
  })
}
/**
 * 支付需要参数
 *
 */
export function payWxConfig(parames) {
  return request({
    url: '/pay/wxConfig',
    method: 'post',
    params: {
      url: window.location.href
    }
  })
}
/**
 * 手动取消订单
 *
 */
export function cancellationOfOrder(params) {
  return request({
    url: '/find/cancellationOfOrder',
    method: 'post',
    params: params
  })
}

/**
 * 获取支付成功柜门信息
 * @param {Number} doorIndex   柜门
 */

export function findContainerImg(params) {
  return request({
    url: '/find/findContainerImg',
    method: 'post',
    params: params
  })
}

/**
 * 获取用户答题题目
 * @param {} data 不用传值 传个{}就可以
 */

export function findUserCheck(params) {
  return request({
    url: '/find/findUserCheck',
    method: 'post',
    params: params
  })
}

/**
 * 查询负责人
 * @param {Number}       订单ID
 */

export function findAccountByMainboardNoMD5(params) {
  return request({
    url: '/find/findAccountByMainboardNoMD5',
    method: 'post',
    params: params
  })
}

/**
 * 查询再次开锁时间
 * @param {Number}
 */

export function isAgainUnlocking(params) {
  return request({
    url: '/find/isAgainUnlocking',
    method: 'post',
    params: params
  })
}
/**
 * 再次开锁
 * @param {Number} orderId            订单Id
 * @param {Number} doorIndex          柜门Id
 */
export function againUnlocking(params) {
  return request({
    url: '/find/againUnlocking',
    method: 'post',
    params: params
  })
}

/**
 * 插入评价
 * @param {Number} orderId            订单Id
 * @param {Number} serviceEvaluateId  服务评价ID
 * @param {Number} productEvaluateId  商品评价ID
 */

export function insertOrderEvaluate(params) {
  return request({
    url: '/find/insertOrderEvaluate',
    method: 'post',
    params: params
  })
}
/**
 * 增加用户行为统计
 * @param {string} previousUrl      上一页来源url
 * @param {string} curUrl           当前url
 * @param {Number} startTime        进入页面时间
 * @param {Number} endTime          离开页面时间
 * @param {Number} stayTime         停留时长
 * @param {string} browser          浏览器
 * @param {string} ppi              手机分辨率
 * @param {boolean} isPay           支付成功页面传true,其他页面传false
 */

export function addUserTrack(params) {
  return request({
    url: '/find/addUserTrack',
    method: 'post',
    params: params
  })
}

/**查询新用户红包 */
export function findUserRedPacketMoney(params) {
  return request({
    url: '/find/findUserRedPacketMoney',
    method: 'post',
    params: params
  })
}
/**下单完成查询赠送红包 */
export function findOrderRedPacket(params) {
  return request({
    url: '/find/findOrderRedPacket',
    method: 'post',
    params: params
  })
}

/**用户残忍放弃 */
export function recordUserAbandonRedPacket(params) {
  return request({
    url: '/find/recordUserAbandonRedPacket',
    method: 'post',
    params: params
  })
}

/**查询优惠劵 */
export function getMyVouchers(params) {
  return request({
    url: '/find/getMyVouchers',
    method: 'post',
    params: params
  })
}
/**查询二维码*/
export function findRedPackCode(params) {
  return request({
    url: '/find/findRedPackCode',
    method: 'post',
    params: params
  })
}

/**用户是否授权*/
export function isAuth(params) {
  return request({
    url: '/find/isAuth',
    method: 'get',
    params: params
  })
}

/**红包规则*/
export function findNotice(params) {
  return request({
    url: '/find/findNotice',
    method: 'post',
    params: params
  })
}

/**红包记录*/
export function getVendorRedpackUserRecord(params) {
  return request({
    url: '/find/getVendorRedpackUserRecord',
    method: 'post',
    params: params
  })
}

/**红包重发*/
export function commonRedPacketSendDetection(params) {
  return request({
    url: '/find/commonRedPacketSendDetection',
    method: 'post',
    params: params
  })
}

/**红包重发*/
export function findVipRule(params) {
  return request({
    url: '/find/findVipRule',
    method: 'post',
    params: params
  })
}

/**二次扫描提示再次开门*/
export function findNotAgainUnlockngOrder(params) {
  return request({
    url: '/find/findNotAgainUnlockngOrder',
    method: 'post',
    params: params
  })
}

/**点击商品获取柜门并锁住柜门*/
export function getDoorIndex(params) {
  return request({
    url: '/find/getDoorIndex',
    method: 'post',
    params: params
  })
}
/**点击商品获取柜门并锁住柜门*/
export function getGroupBuyUrlAndCustomerServerUrl(params) {
  return request({
    url: '/find/getGroupBuyUrlAndCustomerServerUrl',
    method: 'post',
    params: params
  })
}

/**移除柜门锁*/
export function removeDoorLock(params) {
  return request({
    url: '/find/removeDoorLock',
    method: 'post',
    params: params
  })
}

/**17.获取验证码#*/
export function moblieMsg(params) {
  return request({
    url: '/find/moblieMsg',
    method: 'post',
    params: params
  })
}

/**18.绑定##*/
export function saveBind(params) {
  return request({
    url: '/find/saveBind',
    method: 'post',
    params: params
  })
}

/**19.售货机广告下发##*/
export function saveLEDOrder(params) {
  return request({
    url: '/find/saveLEDOrder',
    method: 'post',
    params: params
  })
}

/**19.售货机广告下发##*/
export function downAdvertingToVendor(params) {
  return request({
    url: '/find/downAdvertingToVendor',
    method: 'post',
    params: params
  })
}

/**24.获取优惠券活动列表###*/
export function couponActivitySelect(params) {
  return request({
    url: '/find/couponActivitySelect',
    method: 'post',
    params: params
  })
}
/**25.领取优惠券####*/
export function couponAcquire(params) {
  return request({
    url: '/find/couponAcquire',
    method: 'post',
    params: params
  })
}


 /**26.首页轮播图####*/
export function homePageBanner(params) {
  return request({
    url: '/find/homePageBanner',
    method: 'post',
    params: params
  })
}


 /**公众号二维码####*/
 export function findVendorConfig(params) {
  return request({
    url: '/find/findVendorConfig',
    method: 'post',
    params: params
  })
}


 /**查询用户是否有赔偿的商品####*/
 export function findCompensateIntegralProduct(params) {
  return request({
    url: '/find/findCompensateIntegralProduct',
    method: 'post',
    params: params
  })
}


 /**记录用户已经查看过自己得到赔偿的积分了####*/
 export function recordCompensateIntegralProduct(params) {
  return request({
    url: '/find/recordCompensateIntegralProduct',
    method: 'post',
    params: params
  })
}

/**查询企业微信活动###*/
export function findWeChatActivity(params) {
  return request({
    url: '/find/findWeChatActivity',
    method: 'post',
    params: params
  })
}
/**记录用户点击企业微信活动###*/
export function weChatActivityRecord(params) {
  return request({
    url: '/find/weChatActivityRecord',
    method: 'post',
    params: params
  })
}
/**31查询送货到家商品###*/
export function findSingleProducts(params) {
  return request({
    url: '/find/findSingleProducts',
    method: 'post',
    params: params
  })
}
/**39查询售货机地址###*/
export function findVendorClientAddrss(params) {
  return request({
    url: '/find/findVendorClientAddrss',
    method: 'post',
    params: params
  })
}
/**37添加售货机地址###*/
export function addVendorClientAddrss(params) {
  return request({
    url: '/find/addVendorClientAddrss',
    method: 'post',
    params: params
  })
}
/**38修改售货机地址###*/
export function updateVendorClientAddrss(params) {
  return request({
    url: '/find/updateVendorClientAddrss',
    method: 'post',
    params: params
  })
}
/**40删除售货机地址###*/
export function removeVendorClientAddrss(params) {
  return request({
    url: '/find/removeVendorClientAddrss',
    method: 'post',
    params: params
  })
}
/**32送货到家商品下单支付信息###*/
export function singleProductPay(params) {
  return request({
    url: '/pay/singleProductPay',
    method: 'post',
    params: params
  })
}
/**41送货到家订单查询###*/
export function singleProductOrderSelect(params) {
  return request({
    url: '/find/singleProductOrderSelect',
    method: 'post',
    params: params
  })
}
