import Vue from 'vue'
import axios from 'axios'
import jquery from 'jquery';
import popper from 'popper.js';

import App from './App'
import router from './router'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

try {
  window.Popper = popper;
  window.$ = window.jQuery = jquery;

  require('bootstrap');
} catch (e) {
}


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
