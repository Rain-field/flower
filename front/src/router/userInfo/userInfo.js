import UserInfo from '@/pages/userInfo/UserInfo';
import UserDetail from '@/pages/userInfo/UserDetail';

export default [{
  path: '/userInfo',
  name: 'UserInfo',
  component: UserInfo,
  redirect: '/userDetail',
  children: [{
    path: '/userDetail',
    name: 'UserDetail',
    component: UserDetail,
  }]
}]
