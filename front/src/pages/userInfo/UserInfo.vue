<template>
  <Content :style="{ minHeight: '350px', background: '#fff'}" id="userInfo">
    <Breadcrumb :style="{margin: '16px 5px'}">
      <BreadcrumbItem :to="{name:'Home'}">首页</BreadcrumbItem>
      <BreadcrumbItem>账户设置</BreadcrumbItem>
    </Breadcrumb>
    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu :active-name="activeNumber" theme="light" width="auto">
          <MenuItem name="1" :to="{name:'UserInfo'}">基本信息</MenuItem>
          <MenuItem name="2" to="ChangePwd">修改密码</MenuItem>
          <MenuItem name="3" to="Address">地址管理</MenuItem>
          <MenuItem name="4" :to="'JoinVip'">加入会员</MenuItem>
        </Menu>
      </Sider>
      <Content :style="{padding: '24px 80px', minHeight: '280px', background: '#fff'}">
        <router-view></router-view>
      </Content>
    </Layout>
  </Content>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      activeNumber: "1"
    };
  },
  created() {
    if (this.$route.params.acNum) {
      this.activeNumber = this.$route.params.acNum;
    }
  },
  updated() {
    if (this.$route.params.acNum) {
      this.activeNumber = this.$route.params.acNum;
    }
  }
};
</script>

<style lang="">
.ivu-menu-vertical .ivu-menu-MenuItem -title-icon {
  display: none;
}
.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-MenuItem -title {
  text-align: center;
}
.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-MenuItem -title:hover {
  color: #515a6e;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: #ffeee3;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #ff6700;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  background: #ff6700;
}

.btn {
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  outline: 0;
  user-select: none;
  padding: 5px 15px 6px;
  font-size: 12px;
  border-radius: 4px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear, box-shadow 0.2s linear;
  color: #fff;
  background-color: #ff6700;
  border-color: #ff6700;
}
.btn:hover {
  background-color: #fa9d5f;
  border-color: #fa9d5f;
}
</style>

<style lang="less" scoped>
#userInfo {
  margin-top: 20px;
  width: 1240px;
  margin: auto;
}
</style>
