var timeIn = new Date().getTime();

//定时增加时间  

function getBrowserInfo() {

  var u = navigator.userAgent,
    app = navigator.appVersion;
 
 
  var version = null;
  if (u.toLowerCase().indexOf("like mac os x") > 0) {
    var reg = /os [\d._]+/gi;
    var v_info = u.match(reg);
    version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, "."); //得到版本号9.3.2或者9.0
 
}
if (u.toLowerCase().indexOf("android") > 0) {
  var reg = /android [\d._]+/gi;
  var v_info = u.match(reg);
  version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, "."); //得到版本号4.2.2
 
}
 
 
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    return "android"+" " +version
  } else if (u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1) { //是否为iPhone或者QQHD浏览器){
    return "ios"+" "+version
  }

}



// return "微信"

export function timeStart() {
 
  
  // tjSecond = 0;
  // timeVal = setInterval(function () {
  //   tjSecond++
  // }, 1000);
  timeIn = new Date().getTime();

}

export function postParame(route) {
  //定义空的容器  
  var params = {};
  //获取当前的url地址  
  params.url = location.href;

  params.timeIn = timeIn;
  params.timeOut = new Date().getTime();
 
  params.time = params.timeOut - params.timeIn;

  //获取页面的title标题  
  params.title = route.meta.title;
  //获取域  
  params.domain = document.domain;

  //获取屏幕的高度  
  params.sh = window.screen.height;
  //获取屏幕的宽度  
  params.sw = window.screen.width;
  params.klq = getBrowserInfo();

  //获取语言  
  // params.language = navigator.language;
  //获取来源地址  
  // params.refer = getReferrer();
  //  console.log(params);
  timeStart();
 
  return params

}




export function ajax(options) {
  /**
   * 传入方式默认为对象
   * */
  options = options || {};
  /**
   * 默认为GET请求
   * */
  options.type = (options.type || "GET").toUpperCase();
  /**
   * 返回值类型默认为json
   * */
  options.dataType = options.dataType || 'json';
  /**
   * 默认为异步请求
   * */
  options.async = options.async || true;
  /**
   * 对需要传入的参数的处理
   * */
  var params = getParams(options.data);
  var xhr;
  /**
   * 创建一个 ajax请求
   * W3C标准和IE标准
   */
  if (window.XMLHttpRequest) {
    /**
     * W3C标准
     * */
    xhr = new XMLHttpRequest();
  } else {
    /**
     * IE标准
     * @type {ActiveXObject}
     */
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  };
  if (options.type == 'GET') {
    xhr.open("GET", options.url + '?' + params, options.async);
    xhr.send(null)
  } else if (options.type == 'POST') {
    /** 
     *打开请求
     * */
    xhr.open('POST', options.url, options.async);
    /**
     * POST请求设置请求头
     * */
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    /**
     * 发送请求参数
     */
    xhr.send(params);
  }
}
/**
 * 对象参数的处理
 * @param data
 * @returns {string}
 */
function getParams(data) {
  var arr = [];
  for (var param in data) {
    arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
  }
 
  arr.push(('randomNumber=' + Math.random()).replace('.'));
   
  return arr.join('&');
}

 