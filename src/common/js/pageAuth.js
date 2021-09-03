/**
 * 授权相关 2020-10-12
 * xhx
 */

import { isAuth } from '@/api'

/**页面授权*/
export function pageAuth(appId) {
  var params = {};
  if(appId){
    params.appId = appId;
  }
  isAuth(params).then(res => {

    // window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx57c89676f397cfd1&redirect_uri=https%3A%2F%2Fsqweixin.haoshui.com.cn%2Fweixin%2Foauth2&response_type=code&scope=snsapi_userinfo&state=svmShuiqoo1&component_appid=wx98d2ea7671c59607#wechat_redirect"

    // if (res && res.authUrl && process.env.NODE_ENV !== "development") {
    if (res && res.authUrl) {
      window.location.replace(res.authUrl)
    }

  })
}