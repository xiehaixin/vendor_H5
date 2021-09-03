import axios from 'axios'
import Qs from 'qs'
import {
  Toast
} from 'mint-ui';
import store from '@/store/index'
import { pageAuth } from '@/common/js/pageAuth'
axios.defaults.withCredentials = true;
const service = axios.create({

  baseURL: process.env.NODE_ENV === "development" ? "api" : '', // 的 base_url process.env.VUE_APP_URL, 
  timeout: 10000, // request timeout
  transformRequest: [function (data) {  // 为了Post请求，后端能接收到，如果不做这个处理，后端只能用 @RequestBody 获取请求体
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
  }],
})


// request interceptor
service.interceptors.request.use(
  config => {

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)


// response interceptor
service.interceptors.response.use(function (response) {
    const res = response.data

    // 用户未授权
    if (res.code === 'C00007') {
      /* 用户未授权可能是页面停留太久，服务器用户缓存失效，
      获取页面缓存的appId，如果有，则是服务器用户缓存失效，如果没有，则是第一次扫码进入 */
      var appId = sessionStorage.getItem('appId');
      if(appId){
        Toast({
          message: '您的页面停留太久啦，正在重新登录...',
          position: 'middle',
          duration: 5000
        });
        pageAuth(appId);
      }else{
        Toast({
          message: '正在登录，请稍等...',
          position: 'middle',
          duration: 5000
        });
      }
      return Promise.reject('err')
    } else if (res.code !== "E00000") {
    
      //取消订单 关闭提示80S
      if (response.config.url.indexOf('/find/cancellationOfOrder') != -1) {
        store.dispatch('setOrderTime', null)
      }

      //发起支付 回调
      if (response.config.url.indexOf('/pay/wxPay') != -1 || response.config.url.indexOf('/pay/zfbzf') != -1) {
        return response.data
      } else {
        if(res.message){
        Toast({
          message: res.message,
          position: 'middle',
          duration: 5000
        });
      }
        return Promise.reject('err')
      }
    } else {
      return response.data.data
    }
  },
  error => {
    if( error.message){
    Toast({
      message: error.message,
      position: 'middle',
      duration: 5000
    });
  }
    return Promise.reject(error)
  }
)

export default service
