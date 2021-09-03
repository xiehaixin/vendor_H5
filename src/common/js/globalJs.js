import wx from 'weixin-js-sdk'
import {
  cancellationOfOrder
} from '@/api'
/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 * 如有问题请通过以下渠道反馈：
 * 邮箱地址：weixin-open@qq.com
 * 邮件主题：【微信JS-SDK反馈】具体问题
 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
 */
//    wx.config({
//     debug: false,
//     appId: '',
//     timestamp: 0,
//     nonceStr: '',
//     signature: '',
//     jsApiList: [
//     'checkJsApi',
//     'onMenuShareTimeline',
//     'onMenuShareAppMessage',
//     'onMenuShareQQ',
//     'onMenuShareWeibo',
//     'showOptionMenu',
//     'hideOptionMenu',
//     'hideMenuItems',
//     'showMenuItems',
//     'hideAllNonBaseMenuItem',
//     'showAllNonBaseMenuItem',
//     'translateVoice',
//     'startRecord',
//     'stopRecord',
//     'onRecordEnd',
//     'playVoice',
//     'pauseVoice',
//     'stopVoice',
//     'uploadVoice',
//     'downloadVoice',
//     'chooseImage',
//     'previewImage',
//     'uploadImage',
//     'downloadImage',
//     'getNetworkType',
//     'openLocation',
//     'getLocation',
//     'hideOptionMenu',
//     'showOptionMenu',
//     'closeWindow',
//     'scanQRCode',
//     'chooseWXPay',
//     'openProductSpecificView',
//     'addCard',
//     'chooseCard',
//     'openCard'
//   ]
// });

export function init(appId, timestamp, nonceStr, signature) {
  wx.config({
    debug: false,
    appId: appId,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'showOptionMenu',
      'hideOptionMenu',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ]
  });
}

//确认订单微信支付
export function savePay(appId, timeStamp, nonceStr, packageStr, paySign, cabinetNum, boxNum) {
  return new Promise((resolve, reject) => {


    WeixinJSBridge.invoke('getBrandWCPayRequest', {
        "appId": appId, //公众号名称，由商户传入
        "timeStamp": timeStamp, //时间戳
        "nonceStr": nonceStr, //随机串
        "package": packageStr, //扩展包
        "signType": "MD5", //微信签名方式:1.sha1
        "paySign": paySign //微信签名
      },
      function (res) {
        // alert(res.err_msg);
        let orderType = localStorage.getItem("payOrderType") ? localStorage.getItem("payOrderType") : 1;
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // alert(boxNum);
          // alert($!{boxNum});
          //alert("微信支付成功!");
          resolve(res)
          // window.location.href = "https://svm.shuiqoo.cn/funVm/paySuccess?cabinetNum="+cabinetNum+"&boxNum="+boxNum;
        //   window.location.href = "https://" + window.location.host + "/funVm/index#/paySuccess";
          // sId = "/weixin/products?shopId="+sId;
          // $(".popup-payWeiXin p:last").find('a').attr('href',sId);
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          //alert("用户取消支付!");

          // sId = "/weixin/products?shopId="+sId;
          // $(".popup-payWeiXin p:last").find('a').attr('href',sId);
          // 用户取消支付 直接取消订单
          cancellationOfOrder({
            orderNo: localStorage.getItem("payOrderNo"),
            type: orderType
          }).then(res => {


          });
          reject(res)
        } else {

          cancellationOfOrder({
            orderNo: localStorage.getItem("payOrderNo"),
            type: orderType
          }).then(res => {

          });
          reject(res)
          alert(res.errMsg);
          return;
          // sId = "/weixin/products?shopId="+sId;
          // $(".popup-payWeiXin p:last").find('a').attr('href',sId);
        }
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        //因此微信团队建议，当收到ok返回时，向商户后台询问是否收到交易成功的通知，若收到通知，前端展示交易成功的界面；若此时未收到通知，商户后台主动调用查询订单接口，查询订单的当前状态，并反馈给前端展示相应的界面。
      });
  })
}

//继续支付
export function continueSavePay(appId, timeStamp, nonceStr, packageStr, paySign) {
  // $.alert('savepay: ' + appId);
  WeixinJSBridge.invoke('getBrandWCPayRequest', {
      "appId": appId, //公众号名称，由商户传入
      "timeStamp": timeStamp, //时间戳
      "nonceStr": nonceStr, //随机串
      "package": packageStr, //扩展包
      "signType": "MD5", //微信签名方式:1.sha1
      "paySign": paySign //微信签名
    },
    function (res) {
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        alert("微信支付成功!");
        // window.location.reload();
      } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
        alert("用户取消支付!");
      } else {
        alert("支付失败:" + res.err_msg);
      }
    });
}
