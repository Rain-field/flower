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
        <div class="flower_section" v-for="(item, index) in imgs" :key="index">
          <div class="flower_img">
            <img :src="item.src" alt>
          </div>
          <div class="flower_name">相濡以沫</div>
          <div class="flower_price">￥999.00 <span class="flower_high_price">￥1299</span></div>
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
      imgs: [
        { src: require("../assets/flower/001.jpg"), url: "" },
        { src: require("../assets/flower/002.jpg"), url: "" },
        { src: require("../assets/flower/003.jpg"), url: "" },
        { src: require("../assets/flower/004.jpg"), url: "" },
        { src: require("../assets/flower/005.jpg"), url: "" },
        { src: require("../assets/flower/006.jpg"), url: "" },
        { src: require("../assets/flower/007.jpg"), url: "" },
        { src: require("../assets/flower/008.jpg"), url: "" },
      ]
    };
  }
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
            color: #ff6700;
            .flower_high_price{
                color: #9a9a9a;
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
