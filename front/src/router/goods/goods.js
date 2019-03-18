import Goods from '../../pages/goods/Goods';
import GoodsDetail from '../../pages/goods/GoodsDetail';

export default [{
  path: '/index/goods/:id',
  name: 'Goods',
  component: Goods,
},{
    path: '/goods/:id',
    name: 'GoodsDetail',
    component: GoodsDetail
  }]
