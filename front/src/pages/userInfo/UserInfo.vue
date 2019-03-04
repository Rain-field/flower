<template>
  <Layout :style="{paddingTop:'20px'}">
    <div id="userInfo">
      <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="1" theme="light" width="auto">
              <MenuItem  name="1">
                个人信息
              </MenuItem >
              <MenuItem  name="2">
                修改密码
              </MenuItem >
              <MenuItem  name="3">
                加入会员
              </MenuItem >
            </Menu>
          </Sider>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Content>
    </div>
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
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    background: #ffeee3
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    color: #ff6700;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after{
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
