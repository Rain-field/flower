import Vue from 'vue'
import Router from 'vue-router'
// 一级路由
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';

import Page from '../pages/mainPage/Page';
import Goods from './goods/goods';
import UserInfo from './userInfo/userInfo';
import Help from './help/help';
import Cart from './cart/cart';
import Order from './order/order';

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [{
          path: '/index',
          name: 'Pages',
          component: Page
        },
        ...Goods,
        ...UserInfo,
        ...Help,
        ...Cart,
        ...Order
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      redirect: '/'
    } //当用户输入错误的路径可以跳转到主页面

  ],
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }

})
