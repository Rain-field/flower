<template>
  <div class="header_bg">
    <div class="mall_bg">
      <routerLink class="logo" tag="div" :to="{name:'Home'}">
        <img src="../assets/logo.png" alt="有花商城" title="有花商城">
      </routerLink>
      <div class="search">
        <Input placeholder="搜索">
          <Icon type="ios-search" color="white" slot="suffix"/>
        </Input>
        <ul>
          <li>关键字：</li>
          <li>鲜花</li>
          <li>蛋糕</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.ivu-input {
  height: 40px;
  border: 1px solid #ff6700;
}
.ivu-input:hover,.ivu-input:focus{
  border-color: #ff6700;
}
.ivu-input:focus{
  box-shadow: 0 0 0 2px rgba(255,103,0,.6);
}
.ivu-input-suffix {
  width: 45px;
  background: #ff6700;
  border-radius: 4px;
}
.ivu-input-suffix i {
  line-height: 40px;
  font-size: 20px;
  cursor: pointer;
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
