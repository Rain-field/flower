import UserInfo from '@/pages/userInfo/UserInfo';
import UserDetail from '@/pages/userInfo/UserDetail';
import ChangePwd from '@/pages/userInfo/ChangePwd';
import JoinVip from '@/pages/userInfo/JoinVip';

export default [{
  path: '/index/userInfo',
  name: 'UserInfo',
  component: UserInfo,
  redirect: '/index/userDetail',
  children: [{
    path: '/index/userDetail',
    name: 'UserDetail',
    component: UserDetail,
  },{
    path: '/index/changePwd',
    name: 'ChangePwd',
    component: ChangePwd,
  },{
    path: '/index/joinVip',
    name: 'JoinVip',
    component: JoinVip,
  }]
}]
