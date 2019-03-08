<template>
  <Layout :style="{paddingTop:'20px'}">
    <Content
      :style="{padding: '24px 20px', minHeight: '380px', background: '#fff'}"
      id="goodsDetail"
    >
      <div class="imgShow"><img src="../../assets/flower/001.jpg" alt=""></div>
      <div class="contentShow">
        <h2>这是花的名称</h2>
        <div class="introduction">
          花材：香槟玫瑰6朵，红玫瑰10朵，白玫瑰7朵，艳粉玫瑰10朵，海桐叶搭配，2只小熊。
          花语：每种色彩代表一种语言，温暖，热切，纯洁，甜美，希望快乐和阳光常伴。
        </div>
        <div class="price">
          <div>
            <div class="orignPrice">原价：￥998</div>
            <div class="nowPrice">促销价：
              <span>￥889</span>
            </div>
          </div>
          <div class="vipPrice">会员价：￥666</div>
        </div>
        <div class="number">
          <InputNumber :max="10" :min="1" v-model="value"></InputNumber>
          <span>库存：</span>
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
      value: 1
    };
  }
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
      display: flex;
      margin-bottom: 30px;
      justify-content: space-around;
      align-items: center;
      font-size: 18px;
      .orignPrice {
        text-decoration: line-through;
        padding: 10px 0;
        color: rgb(175, 175, 175);
      }
      .nowPrice {
        padding: 10px 0;
        span {
          color: #ff6700;
        }
      }
      .vipPrice {
        font-size: 30px;
        transform: rotate(10deg);
        color: #ff6700;
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
