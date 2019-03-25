import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
