<template>
  <div id="categories">
    <div class="flower">
      <div class="flower_title">鲜花</div>
      <div class="flower_more">查看更多</div>
    </div>
    <div class="flower_wrap">
      <div class="flower_main">
        <img :src="mainImg.src" alt>
      </div>
      <div class="flower_sections">
        <div class="flower_section" v-for="(item, index) in lists" :key="index">
          <div class="flower_img" @click="toDetail(item.id)">
            <img :src="item.url" alt>
          </div>
          <div class="flower_name">{{item.name}}</div>
          <div class="flower_price">￥{{item.vipPrice}} <span class="flower_high_price">￥{{item.price}}</span></div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  data() {
    return {
      mainImg:{src: require("../assets/flower/main.jpg"), url: ""},
      lists:[]
    };
  },
  methods: {
    getDatas() {
      this.$axios.get("/apis/goods").then(res => {
        this.lists = res.data;
        this.lists.forEach((item,index) => {
          item.url = require("@/"+item.url);
        });
      })
    },
    toDetail(id){
      this.$router.push({name:"GoodsDetail",params:{id:id}});
    }
  },
  created() {
    this.getDatas();
  },
};
</script>

<style lang="less" scoped>
#categories {
  width: 1240px;
  margin: 20px auto;
  .flower {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    font-size: 18px;
    .flower_title {
      padding: 5px 50px;
      color: white;
      background: #ff6700;
    }
    .flower_more {
      padding: 5px 0;
      cursor: pointer;
    }
  }
  .flower_wrap {
    display: flex;
    .flower_main {
      width: 21%;
      height: 600px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .flower_sections {
        width: 79%;
        display: flex;
        flex-wrap: wrap;
        cursor: pointer;
      .flower_section {
          width: 23.5%;
        margin-left: 1.5%;
        .flower_img {
          height: 225px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .flower_name {
          text-align: center;
          font-size: 16px;
        }
        .flower_price {
            text-align: center;
            font-size: 18px;
            font-weight: bolder;
            color: #ff6700;
            .flower_high_price{
                color: #9a9a9a;
                font-weight: lighter;
                text-decoration: line-through;
            }
        }
      }
      .flower_section:nth-child(n+5){
          margin-top: 1%;
      }
    }
  }
}
</style>
