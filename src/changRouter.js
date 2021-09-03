import router from './router'
import {
  postParame,
  ajax
} from '@/common/js/pageTime'
// import {

//   wxTest
// } from '@/api'

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
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }



  var curUrl = '';
  if ('/' == from.path) {
    curUrl = location.href + to.name;
  } else {
    curUrl = location.href.replace(from.path, to.path);
  }
  if (from.name) {
    var ii = postParame(from)

    ajax({
      url:process.env.NODE_ENV === "development"?'/api/find/addUserTrack': "/find/addUserTrack", //请求地址
      type: 'post', //请求方式
      data: {
        previousUrl: ii.url,
        curUrl: curUrl,
        startTime: ii.timeIn,
        endTime: ii.timeOut,
        stayTime: ii.time,
        browser: ii.klq,
        ppi: ii.sw + "×" + ii.sh,
        isPay: to.path == "/paySuccess"
      }, //请求参数
      dataType: "json", // 返回值类型的设定
      async: true, //是否异步
    });


    // addUserTrack()
  }
  if (judgeStyle()) {
    next()
  } else {
    next()
  }


})

async function judgeStyle(params) {
  if (process.env.NODE_ENV === "development") {
    await ajax({
      url: "/api/wxTest/test", //请求地址
      type: 'post', //请求方式
      data: {
        //openId: "oGLfUwF1xL36aLz0zVYVN1FUI81c", // 刘淑丽好水生活openId
        openId: "oGLfUwA9EtL27TRru2HXwlftpB7E", // 李冀好水生活openId
        //openId: "oGLfUwAdUuHiyZM_-GzstCfMeCFI",
        //openId: "oGLfUwMKd9JIGz9LC8FamGUTAV5Q", // 黄江龙好水生活openId
        mainboardNoMD5: "2b080a338b015811 "
      }, //请求参数
      dataType: "json", // 返回值类型的设定
      async: true, //是否异步
    });


    // await wxTest({
    //   openId: "oGLfUwMKd9JIGz9LC8FamGUTAV5Q",
    //   mainboardNoMD5: "05ed6e9885eb7e3c"
    // })
    return judgeStyle = () => {
      return true
    }

  }
}
