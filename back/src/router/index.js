import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login';
import Home from '@/pages/Home';

import ShowData from '@/pages/showData/ShowData';
import UserManagement from '@/pages/userManagement/UserManagement';
import GoodManagement from '@/pages/goodManagement/GoodManagement';
import GoodAdd from '@/pages/goodAdd/GoodAdd';
import OrderManagement from '@/pages/orderManagement/OrderManagement';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children:[
        {
          path: '/index',
          name: 'ShowData',
          component: ShowData,
          meta:'首页'
        },
        {
          path: '/index/userManagement',
          name: 'UserManagement',
          component: UserManagement,
          meta:'用户管理'

        },
        {
          path: '/index/goodManagement',
          name: 'GoodManagement',
          component: GoodManagement,
          meta:'商品管理'

        },
        {
          path: '/index/goodAdd',
          name: 'GoodAdd',
          component: GoodAdd,
          meta:'商品添加'

        },
        {
          path: '/index/orderManagement',
          name: 'OrderManagement',
          component: OrderManagement,
          meta:'订单管理'
        },
      ]
    }
  ],
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
