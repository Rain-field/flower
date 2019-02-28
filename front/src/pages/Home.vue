<template>
    <div class="contain">
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
      <div class="header_bg">
        <div class="mall_bg">
          <div class="logo">
            <img src="./assets/logo.png" alt="有花商城" title="有花商城">
          </div>
          <div class="search">
            <Input placeholder="搜索">
              <Icon type="ios-search" slot="suffix"/>
            </Input>
            <ul>
              <li>关键字：</li>
              <li>鲜花</li>
              <li>蛋糕</li>
            </ul>
          </div>
        </div>
      </div>
      <nav>
        <div class="mall_nav">
          <div class="nav_top">
            <Dropdown>
            <Button type="warning">商品分类
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>驴打滚</DropdownItem>
              <DropdownItem>炸酱面</DropdownItem>
              <DropdownItem>豆汁儿</DropdownItem>
              <Dropdown placement="right-start">
                <DropdownItem>北京烤鸭
                  <Icon type="ios-arrow-forward"></Icon>
                </DropdownItem>
                <DropdownMenu slot="list">
                  <DropdownItem>挂炉烤鸭</DropdownItem>
                  <DropdownItem>焖炉烤鸭</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <DropdownItem>冰糖葫芦</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
  name: "Home"
};
</script>
<style>
.ivu-input {
  height: 40px;
}
.ivu-input-suffix {
  width: 45px;
}
.ivu-input-suffix i {
  line-height: 40px;
  font-size: 20px;
  cursor: pointer;
}
.ivu-dropdown-item:hover{
  background: #ff6700;
}
.ivu-btn-warning{
  background: #ff6700;
  border-color: #ff6700;
  font-size: 16px;
}
.ivu-btn-warning:hover{
  background: #ff781f;
  border-color: #ff781f;
  font-size: 16px;
}
.ivu-dropdown-item{
  padding: 10px 25px;
}
</style>


<style lang="less" scoped>
body * {
  list-style: none;
}
.contain {
  @color: #ff6700;
  font-size: 14px;
  min-width: 1240px;
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
            color: @color;
          }
        }
      }
    }
  }
  .header_bg {
    height: 80px;
    border-bottom: 3px solid #ff6700;
    .mall_bg {
      width: 1240px;
      margin: auto;
      .logo {
        margin-top: -10px;
        float: left;
      }
      .search {
        width: 400px;
        height: 70px;
        margin: auto;
        margin-top: 20px;
        ul {
          display: flex;
          font-size: 12px;
          margin-top: 8px;
          li:not(:first-child) {
            margin-left: 10px;
            color: #9a9a9a;
            cursor: pointer;
          }
        }
      }
    }
  }
  nav {
    .mall_nav {
      width: 1240px;
      margin: auto;
      .nav_top{
        background: @color;
      }
    }
  }
}
</style>
