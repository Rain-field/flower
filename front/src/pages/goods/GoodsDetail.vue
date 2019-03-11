<template>
  <Layout :style="{paddingTop:'20px'}">
    <Content
      :style="{padding: '24px 20px', minHeight: '380px', background: '#fff'}"
      id="goodsDetail"
    >
      <div class="imgShow"><img :src=detail.url alt=""></div>
      <div class="contentShow">
        <h2>{{detail.name}}</h2>
        <div class="introduction">
          {{detail.info}}
        </div>
        <div class="price">
          <div>
            <div class="orignPrice">原价：￥{{detail.price}}</div>
            <div class="vipPrice">VIP特价：
              <span>￥{{detail.vipPrice}}</span>
            </div>
          </div>
        </div>
        <div class="number">
          <InputNumber :max="10" :min="1" v-model="value"></InputNumber>
          <span>库存：{{detail.inventory}}</span>
        </div>
        <div class="btns">
          <button class="btn">立即购买</button>
          <button class="btn">加入购物车</button>
        </div>
      </div>
    </Content>
  </Layout>
</template>

<script>
export default {
  name: "GoodsDetail",
  data() {
    return {
      value: 1,
      goodsId:0,
      detail:{}
    };
  },
  methods: {
    getDatas() {
      this.$axios.get("/apis/goods/"+this.goodsId).then(res => {
        console.log(res.data);
        this.detail = res.data;
        this.detail.url = require("@/"+this.detail.url);
      })
    }
  },
  created() {
    this.goodsId = this.$route.params.id;
    this.getDatas();
  },
};
</script>

<style lang="less" scoped>
#goodsDetail {
  width: 1240px;
  margin: auto;
  display: flex;
  .imgShow {
    width: 35%;
    margin: 20px;
    padding: 20px;
    border: 1px solid rgb(226, 226, 226);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .contentShow {
    width: 65%;
    margin: 20px;
    padding: 0 10px;
    h2{
      margin-bottom: 30px;
    }
    .introduction {
      margin-bottom: 30px;
    }
    .price {
      background: #f8f8f9;
      margin-bottom: 30px;
      font-size: 18px;
      padding-left: 40px;
      .orignPrice {
        text-decoration: line-through;
        padding: 10px 0;
        color: rgb(175, 175, 175);
      }
      .vipPrice {
        padding: 10px 0;
        span {
          color: #ff6700;
          font-size: 26px;
        }
      }
    }
    .number {
      margin-bottom: 30px;
    }
    .btns {
      margin-bottom: 30px;
      .btn {
        cursor: pointer;
        border: 1px solid transparent;
        white-space: nowrap;
        line-height: 1.5;
        outline: 0;
        user-select: none;
        padding: 5px 15px 6px;
        font-size: 18px;
        border-radius: 4px;
        transition: color 0.2s linear, background-color 0.2s linear,
          border 0.2s linear, box-shadow 0.2s linear;
        color: #fff;
        background-color: #ff6700;
        border-color: #ff6700;
      }
      .btn:last-child{
        margin-left: 15px;
        background: #fff;
        color: #ff6700;
      }
      .btn:first-child:hover {
        background-color: #fa9d5f;
        border-color: #fa9d5f;
      }
    }
  }
}
</style>
