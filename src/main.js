/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import FastClick from 'fastclick'
import lazyload from 'vue-lazyload'
// import ElementUI from 'element-ui';

import "@/common/font/iconfont.css"
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible'
import './changRouter'


/* import Vconsole from 'vconsole';
const vConsole = new Vconsole(); */
import {
  Button,
  Indicator,
  Toast,
  Popup,
  Picker,
  Field,
  Range,
  Cell,
  Switch,
  Checklist ,
  Swipe, SwipeItem

} from 'mint-ui';
Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component('shade', () => import('@/components/Shade/'));
Vue.config.productionTip = false
Vue.component(Cell.name, Cell);
Vue.component(Range.name, Range);
Vue.component(Switch.name, Switch);
Vue.component(Field.name, Field);
Vue.component(Checklist.name, Checklist);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// FastClick.prototype.focus = function(targetElement) {
//   targetElement.focus();
// };
// FastClick.attach(document.body)


Vue.prototype.loading = Indicator;
Vue.prototype.toast = Toast;

Vue.use(lazyload, {
  loading: require('@/assets/img-before@2x.png'),
  error: require('@/assets/device_broken.png')
})
// Vue.use(ElementUI, { size: "small", zIndex: 3000 });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
/* eslint-disable */
