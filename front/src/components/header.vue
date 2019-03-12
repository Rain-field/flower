<template>
  <header>
    <div class="mall_head">
      <div class="mall_left">
        <span>欢迎来到有花商城!</span>
      </div>
      <div class="mall_right">
        <ul>
          <routerLink :to="{name:'Login'}" tag="li" v-if="!Object.keys(lists).length">登录/注册</routerLink>
          <routerLink :to="{name:'UserInfo'}" tag="li" v-if="Object.keys(lists).length">
            <Dropdown>
              <a href="javascript:void(0)">
                {{nickName}}
                <Icon type="logo-vimeo" class="sup" v-if="lists.isVip" color="#ff6700"/>
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <routerLink
                  class="ivu-dropdown-item"
                  tag="li"
                  :to="{name:'UserDetail',params:{acNum:'1'}}"
                >基本信息</routerLink>
                <routerLink
                  class="ivu-dropdown-item"
                  tag="li"
                  :to="{name:'ChangePwd',params:{acNum:'2'}}"
                >修改密码</routerLink>
                <routerLink
                  class="ivu-dropdown-item"
                  tag="li"
                  :to="{name:'Address',params:{acNum:'3'}}"
                >地址管理</routerLink>
                <routerLink
                  class="ivu-dropdown-item"
                  tag="li"
                  :to="{name:'JoinVip',params:{acNum:'4'}}"
                >加入会员</routerLink>
              </DropdownMenu>
            </Dropdown>
          </routerLink>
          <routerLink :to="{name:'Help'}" tag="li">我的订单</routerLink>
          <routerLink :to="{name:'Cart'}" tag="li">
            <Icon type="md-cart" size="14"  color="#ff6700" class="mid"/>购物车
          </routerLink>
          <routerLink :to="{name:'Help'}" tag="li">帮助中心</routerLink>
          <li v-if="Object.keys(lists).length" @click="logout">退出</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      lists: {},
      nickName:""
    };
  },
  methods: {
    logout() {
      let vm = this;
      vm.$Modal.confirm({
        title: "提示",
        content: "确认要退出吗？",
        onOk: () => {
          vm.$Message.info("退出成功");
          sessionStorage.clear();
          vm.$router.push({name:"Pages"});
          vm.lists = {};
        }
      });
    }
  },
  created() {
    if (sessionStorage.getItem("obj") !== null) {
      this.lists = JSON.parse(sessionStorage.getItem("obj"));
      this.nickName = sessionStorage.getItem("nickName");
    }
  }
};
</script>

<style lang="less" scoped>
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
          a {
            color: #9a9a9a;
            .sup{
              vertical-align: super;
            }
          }
          a:hover {
            color: #ff6700;
          }
          ul {
            display: flex;
            flex-direction: column;
            li:not(:last-of-type) {
              margin-right: 0;
            }
            li:hover {
              color: #515a6e;
            }
          }
          .mid{
            vertical-align: baseline;
          }
        }
        li:not(:last-of-type) {
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
