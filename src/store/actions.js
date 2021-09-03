export const setStyleColor = function ({
  commit
}, styleCount) {
  commit('setStyleColor', styleCount);
}

export const isOrderKeepAilveSwitch = function ({
  commit
}, is) {
  commit('isOrderKeepAilveSwitch', is);
}

var timer = null;
export const setOrderTime = function ({
  commit
}, is) {

  commit('ORDER_TIME', is);
  clearInterval(timer);
  if (is > 0) {
    timer = setInterval(() => {
      is -= 1;
      if (is <= 0) {
        clearInterval(timer);
        timer = null;
      }
      commit('ORDER_TIME', is);
    }, 1000);
  }

}