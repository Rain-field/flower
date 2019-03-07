import UserInfo from '@/pages/userInfo/UserInfo';
import UserDetail from '@/pages/userInfo/UserDetail';
import ChangePwd from '@/pages/userInfo/ChangePwd';
import JoinVip from '@/pages/userInfo/JoinVip';
import Address from '@/pages/userInfo/Address';

export default [{
  path: '/index/userInfo',
  name: 'UserInfo',
  component: UserInfo,
  redirect: '/userInfo/userDetail',
  children: [{
    path: '/userInfo/userDetail',
    name: 'UserDetail',
    component: UserDetail,
  },{
    path: '/userInfo/changePwd',
    name: 'ChangePwd',
    component: ChangePwd,
  },{
    path: '/userInfo/joinVip',
    name: 'JoinVip',
    component: JoinVip,
  },{
    path: '/userInfo/address',
    name: 'Address',
    component: Address,
  }]
}]
