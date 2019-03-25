// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.baseURL = process.env.API_ROOT;
Vue.use(iView);

router.beforeEach((to,from,next) => {
  if(to.name == 'Login' || to.name == 'Pages' || to.name == 'Goods' || to.name == 'GoodsDetail' || to.name == 'Help' || to.name == 'Register'){
    next();
  }else if(sessionStorage.getItem("obj")){
    next();
  }else{
    next({name:'Login'});
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
