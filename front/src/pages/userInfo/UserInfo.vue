<template>
  <Layout :style="{paddingTop:'20px'}">
    <Content :style="{ minHeight: '300px', background: '#fff'}" id="userInfo">
      <Breadcrumb :style="{margin: '16px 5px'}">
        <BreadcrumbItem :to="{name:'Home'}">首页</BreadcrumbItem>
        <BreadcrumbItem>账户设置</BreadcrumbItem>
      </Breadcrumb>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1" theme="light" width="auto">
            <MenuItem name="1" :to="{name:'UserInfo'}">基本信息</MenuItem>
            <MenuItem name="2" to="ChangePwd">修改密码</MenuItem>
            <MenuItem name="3" :to="'JoinVip'">加入会员</MenuItem>
          </Menu>
        </Sider>
        <Content :style="{padding: '24px 80px', minHeight: '280px', background: '#fff'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Content>
  </Layout>
</template>

<script>
export default {
  name: "UserInfo"
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
</style>

<style lang="less" scoped>
#userInfo {
  margin-top: 20px;
  width: 1240px;
  margin: auto;
}
</style>
