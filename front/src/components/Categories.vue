<template>
  <div id="categories">
    <div class="flower">
      <div class="flower_title">{{title}}</div>
      <div class="flower_more" @click="toGoods">
        <Icon type="ios-arrow-dropright-circle" size="30" color="#ff6700"/>
      </div>
    </div>
    <div class="flower_wrap">
      <div class="flower_main" @click="toGoods">
        <img :src="main[goodId-1]" alt>
      </div>
      <div class="flower_sections">
        <div class="flower_section" v-for="(item, index) in lists" :key="index">
          <div class="flower_img" @click="toDetail(item.id)">
            <img :src="item.url" alt>
          </div>
          <div class="flower_name">{{item.name}}</div>
          <div class="flower_price">
            <span class="flower_high_price">￥{{item.price}}</span>
            ￥{{item.vipPrice}}
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  props: ["title", "goodId"], //标题和类型id
  data() {
    return {
      mainImg: { src: require("../assets/flower/main.jpg"), url: "" },
      main: [this.baseImg+'/activity/main1.jpg',this.baseImg+'/activity/main2.jpg',this.baseImg+'/activity/main3.png',this.baseImg+'/activity/main4.jpg'],
      lists: []
    };
  },
  methods: {
    getDatas() {
      this.$axios
        .get(
          this.baseURL + "/goods?online=1&_page=1&_limit=8&type=" + this.goodId
        )
        .then(res => {
          this.lists = res.data;
        });
    },
    toDetail(id) {
      this.$router.push({ name: "GoodsDetail", params: { id: id } });
    },
    toGoods() {
      this.$router.push({ name: "Goods", params: { id: this.goodId } });
    }
  },
  created() {
    this.getDatas();
  }
};
</script>

<style lang="less" scoped>
#categories {
  width: 1240px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 2px 3px 4px #ff6700 outset;
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
      cursor: pointer;
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
      .flower_section {
        width: 23.5%;
        margin-left: 1.5%;
        box-shadow:0 0 10px #e5e5e5;
        cursor: pointer;
        .flower_img {
          height: 225px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .flower_name {
          font-size: 14px;
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
          padding: 5px 10px;
        }
        .flower_price {
          font-size: 18px;
          padding: 5px 10px;
          font-weight: bolder;
          color: #ff6700;
          .flower_high_price {
            color: #9a9a9a;
            font-weight: lighter;
            text-decoration: line-through;
          }
        }
      }
      .flower_section:nth-child(n + 5) {
        margin-top: 1%;
      }
    }
  }
}
</style>
