<template>
  <div class="header_bg">
    <div class="mall_bg">
      <routerLink class="logo" tag="div" :to="{name:'Home'}">
        <img src="../assets/logo.png" alt="有花商城" title="有花商城">
      </routerLink>
      <div class="search">
        <input type="text" placeholder="搜索" class="searchInput">
        <Icon type="ios-search" size="20" slot="suffix"/>
        <ul>
          <li>关键字：</li>
          <routerLink
            v-for="(item, index) in keywords"
            :key="index"
            :to="item.url"
            tag="li"
          >{{item.name}}</routerLink>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderBg",
  data() {
    return {
      keywords: [
        { name: "鲜花", url: { name: "Login" } },
        { name: "蛋糕", url: { name: "Register" } },
        { name: "礼品", url: { name: "Register" } },
        { name: "绿植", url: { name: "Register" } }
      ]
    };
  }
};
</script>

<style>
.ivu-icon-ios-search {
  background-color: #ff6700;
  height: 35px;
  line-height: 35px;
}
</style>

<style lang="less">
.header_bg {
  height: 80px;
  border-bottom: 3px solid #ff6700;
  .mall_bg {
    width: 1240px;
    margin: auto;
    .logo {
      margin-top: -10px;
      float: left;
      cursor: pointer;
    }
    .search {
      width: 400px;
      height: 70px;
      margin: auto;
      margin-top: 20px;
      font-size: 0;
      .searchInput {
        border: 1px solid #ff6700;
        width: 280px;
        font-size: 14px;
        border-radius: 4px 0 0 4px;
        padding-left: 8px;
        height: 35px;
        line-height: 35px;
        outline: none;
        transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
      }
      .searchInput:focus {
        border-color: #ff6700;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(253, 172, 78, 0.2);
      }
      i {
        padding: 0 15px;
        vertical-align: top;
        color: white;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
      }
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
</style>
