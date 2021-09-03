export function addClass(el, className) {
  if (hasClass(el, className)) return
    // console.log(hasClass(el, className))
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style

// IIFE
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }
  // 拼接 eg：webkitTransform
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}



export function computeDown(t) {
  let days = Math.floor(t / 1440 / 60);
  let hour = Math.floor((t - days * 1440 * 60) / 3600);
  let min = Math.floor((t - days * 1440 * 60 - hour * 3600) / 60);
  let sec = parseInt(t - days * 1440 * 60 - hour * 3600 - min * 60);

  days < 0 ? days = '00' : days;
  hour < 0 ? hour = '00' : hour;
  min < 0 ? min = '00' : min;
  sec < 0 ? sec = '00' : sec;
  days = days.toString().length < 2 ? "0" + days : days;
  hour = hour.toString().length < 2 ? "0" + hour : hour;
  min = min.toString().length < 2 ? "0" + min : min;
  sec = sec.toString().length < 2 ? "0" + sec : sec;
  return {
    days,
    hour,
    min,
    sec
  }
}
