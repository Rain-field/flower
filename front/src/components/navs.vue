/**
* 作者 ：yhzzy
*
* 日期 ：2018/06/19
*
* 描述 ：导航菜单
*/
<template>
  <div>
    <div class="layout-logo">
      <!--<img src="/static/images/logo.74bab573.png" alt="">-->
      {{options.title}}
    </div>
    <Menu :active-name="setActiveUrl.childName" :open-names="setActiveUrl.parentName" ref="mainMenu" theme="dark" width="auto" :class="menuitemClasses" @on-select="changeUrl" accordion>
      <Submenu class="menu-item-li" v-for="option in options.data" :key="option.navId" :name="option.navId" v-if="option.isParent" >
        <template slot="title">
          <Icon :type="option.icon"></Icon>
          {{option.label}}
        </template>
        <MenuItem class="menu-item-submenu" v-for="item in option.children" :key="item.navId" :name="item.frontUrl" >
          {{item.label}}
        </MenuItem>
      </Submenu>
      <MenuItem class="menu-item-noSubmenu" v-for="option in options.data" :key="option.navId" :name="option.frontUrl" v-if="!option.isParent">
        <Icon :type="option.icon"></Icon>
        <span>{{option.label}}</span>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
  /* eslint-disable indent */

  export default{
    name: 'NavsBar',
    props: ['options'],
    data () {
      return {

      }
    },
    created () {

    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      setActiveUrl () {
        let vm = this;
        let navArr = vm.$props.options.data;
        let userId = window.sessionStorage.getItem("userInfoIdFront");
        if (name === '/consultingQuestion' && userId === '') {
          return;
        }
        if (name === '/MyQuestion' && userId === '') {
          return;
        }
        return vm.$store.getters.setActiveUrl(navArr);
      }
    },
    methods: {
      changeUrl: function (name) {
        let vm = this;
        let userId = window.sessionStorage.getItem("userInfoIdFront");
        if (name === '/consultingQuestion' && (userId === '' || userId === undefined || userId === null)) {
          vm.$Modal.confirm({
            title: '信息',
            content: '请您先登录，登录后可提交问题反馈、查看已提交问题反馈？',
            onOk: function () {
              vm.$router.push({'path': '/login'});
            }
          });
          return;
        }
        if (name === '/MyQuestion' && (userId === '' || userId === undefined || userId === null)) {
          vm.$Modal.confirm({
            title: '信息',
            content: '请您先登录，登录后可提交问题反馈、查看已提交问题反馈？',
            onOk: function () {
              vm.$router.push({'path': '/login'});
            }
          });
          return;
        }
        vm.$router.push({'path': name});
        vm.$store.commit('activeUrl', name);
      }
    }
  }
</script>

<style lang="less" scoped>
  .layout-logo{
    font-size: 20px;
    color: #1278ed;
    font-weight: bold;
    /* padding: 10px 30px; */
    background: #002140;
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin-bottom: 28px;
    img{
      display: inline-block;
      vertical-align: middle;
      height: 45px;
    }
  }
  .menu-item{
    font-size: 14px;
    background: #001529;
    .menu-item-li.ivu-menu-opened{
      border-left: 4px solid #5B99E6;
      .menu-item-submenu{
        /*padding: 7px 24px 7px 55px!important;*/
        height: 40px;
        line-height: 40px;
      }
    }
    .menu-item-noSubmenu{
      /*height: 40px;*/
      /*line-height: 40px;*/
      margin-bottom: 5px;
      span{
        color: #acb8c3;
        font-size: 16px;
      }
      &.ivu-menu-item-selected{
        color: #ffffff!important;
        background: #1278ed!important;
        /*border-left: 4px solid #5B99E6;*/
        border-right: none;
        span{
          color: #ffffff!important;
        }
       }
    }
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 23px;
  }
  .collapsed-menu span{
    width: 0;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
