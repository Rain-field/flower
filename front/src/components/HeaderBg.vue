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
      <div class="contact">
        <div class="tel"><Icon type="ios-call-outline" size="28" color="#ff6700"/> 400-0008-8888</div>
        <div class="toUs" @click="toKefu"><Icon type="ios-headset-outline" size="28" color="#ff6700"/> 在线客服</div>
      </div>
    </div>
    <!-- <uni-pop :show="show" @hidePopup="togglePopup" msg="你好啊"></uni-pop> -->
  </div>
</template>

<script>
import uniPop from '@/components/Pop.vue';
export default {
  components:{
    uniPop
  },
  name: "HeaderBg",
  data() {
    return {
      show:true,
      keywords: [
        { name: "鲜花", url: { name: "Goods", params: { id: 1 } } },
        { name: "蛋糕", url: { name: "Goods", params: { id: 2 } } },
        { name: "礼品", url: { name: "Goods", params: { id: 3 } } },
        { name: "绿植", url: { name: "Goods", params: { id: 4 } } }
      ]
    };
  },
  methods: {
    togglePopup() {
      this.show = !this.show;
      console.log('hello');
    },
    toKefu() {
      this.$Message.info("客服暂未开通，敬请期待！")
    }
  },
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
  height: 100px;
  border-bottom: 3px solid #ff6700;
  .mall_bg {
    width: 1240px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      cursor: pointer;
    }
    .search {
      width: 28%;
      height: 70px;
      margin-left: 200px;
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
        height: 35px;
        line-height: 35px;
        color: white;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
      }
      ul {
        display: flex;
        width: 330px;
        margin-top: 8px;
        font-size: 12px;
        li:not(:first-child) {
          margin-left: 10px;
          color: #9a9a9a;
          cursor: pointer;
        }
      }
    }
    .contact{
      width: 30%;
      display: flex;
      justify-content: space-around;
      div{
        cursor: pointer;
      }
    }
  }
}
</style>
