<template>
  <header>
    <div class="mall_head">
          <div class="mall_left">
            <span>欢迎来到有花商城!</span>
          </div>
          <div class="mall_right">
            <ul>
              <li>我的账户</li>
              <li>我的订单</li>
              <li>
                <Icon type="md-cart" size="14"/>购物车
              </li>
              <li>帮助中心</li>
            </ul>
          </div>
        </div>
  </header>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
header {
    color: #9a9a9a;
    background: #f2f2f2;
    border-bottom: 1px solid #dbdbdb;
    .mall_head {
      width: 1240px;
      line-height: 40px;
      height: 40px;
      margin: auto;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      .mall_right {
        flex-grow: 2;
        ul {
          display: flex;
          justify-content: flex-end;
          li {
            cursor: pointer;
          }
          li:not(:last-child) {
            margin-right: 20px;
          }
          li:hover {
            color: #ff6700;
          }
        }
      }
    }
  }
</style>
