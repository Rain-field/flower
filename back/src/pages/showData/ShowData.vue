<template>
  <div class="showData">
    <div class="dataHeader">
      <div class="dataItem" v-for="(item, index) in headers" :key="index">
        <div class="itemTop">{{item.name}}</div>
        <div class="itemBottom" v-if="item.num">{{item.num}}</div>
        <div class="itemBottom" v-if="item.price">￥{{Number(item.price).toLocaleString('en-US')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          name: "年度总销量",
          num:"1000",
        },
        {
          name: "年度总收入",
          price:"51600000",
        },
        {
          name: "年度总订单量",
          num:"102234300",
        },
        {
          name: "用户总量",
          num:"145000",
        },
      ]
    };
  },
  methods: {

  },
};
</script>

<style lang="less" scoped>
.showData {
  padding: 20px;
  .dataHeader {
    display: flex;
    justify-content: space-between;
    .dataItem {
      width: 22%;
      background-color: #fff;
      border-radius: 10px;
      height: 120px;
      overflow: hidden;
      // padding: 20px;
      .itemTop {
        border-top: 4px solid #2d8cf0;
        padding: 10px;
        letter-spacing: 2px;
        border-bottom: 1px solid #eee;
      }
      .itemBottom{
          padding: 20px 10px;
          font-size: 24px;
          font-weight: bold;
      }
    }
  }
}
</style>


