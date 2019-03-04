import Vue from 'vue'
import Router from 'vue-router'
// 一级路由
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';

import Page from '../pages/mainPage/page';
import UserInfo from './userInfo/userInfo';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect:'/page',
      children:[
        {path: '/page',name: 'Pages',component: Page},
        ...UserInfo
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
    }
  ],
  mode:'history'
})
