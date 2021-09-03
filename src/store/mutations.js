import * as types from './mutations-types'
const map = new Map();
map.set(1, 'a');
map.set(2, 'b');
map.set(3, 'c');
map.set(4, 'd');
map.set(5, 'e');
map.set(6, 'f');
map.set(7, 'g');

const mutations = {
  setStyleColor(state, styleCount) {
    state.styleColor = map.get(Number(styleCount));
  },

  [types.SET_USERINFO](state, val) {
    state.userInfo = val;
  },
  [types.PAY](state, val) {
    state.payParames = val;
  },
  [types.ORDER_TIME](state, val) {
    state.orderTime = val;
  },
  [types.POP_CASH](state, val) {
    state.userCash = val;
  },
}

export default mutations
