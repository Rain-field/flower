<template>
  <Layout :style="{paddingTop:'20px'}">
    <Content :style="{padding: '24px 20px', minHeight: '380px', background: '#fff'}">
      <Breadcrumb :style="{width:'1240px' ,margin: 'auto',paddingLeft:'20px'}">
        <BreadcrumbItem :to="{name:'Home'}">首页</BreadcrumbItem>
        <BreadcrumbItem>商品详情</BreadcrumbItem>
      </Breadcrumb>
      <div id="goodsDetail">
        <div class="imgShow">
          <img :src="detail.url" alt>
        </div>
        <div class="contentShow">
          <h2>{{detail.name}}</h2>
          <div class="introduction">{{detail.info}}</div>
          <div class="havesaled">销量: {{detail.haveSaled}}</div>
          <div class="price">
            <div class="orignPrice">原价：￥{{detail.price}}</div>
            <div class="vipPrice">
              VIP特价：
              <span>￥{{detail.vipPrice}}</span>
            </div>
          </div>
          <div class="number">
            <span>数量：</span>
            <InputNumber :max="Number(detail.inventory)" :min="1" v-model="value"></InputNumber>
            <span>库存：{{detail.inventory}}</span>
          </div>
          <div class="btns" v-if="detail.inventory">
            <button class="btn" @click="toBuy">立即购买</button>
            <button class="btn" @click="toCart">加入购物车</button>
          </div>
          <div class="noList" v-if="!detail.inventory">商品暂时无货！</div>
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
      id: null,
      isVip: null,
      goodId: null,

      value: 1,
      detail: {}
    };
  },
  methods: {
    getDatas() {
      this.$axios.get(this.baseURL + "/goods/" + this.goodId).then(res => {
        this.detail = res.data;
      });
    },
    toBuy() {
      this.isVip = Number(sessionStorage.getItem("isVip"));
      let arr = [
        {
          goodId: this.detail.id,
          name: this.detail.name,
          num: this.detail.num,
          quantity: this.value,
          price: null,
          url: this.detail.url,
          inventory: this.detail.inventory,
          haveSaled: this.detail.haveSaled
        }
      ];
      arr[0].price = this.isVip ? this.detail.vipPrice : this.detail.price;
      this.$router.push({ name: "OrderConfirm" });
      sessionStorage.setItem("orderArr", JSON.stringify(arr));
    },
    toCart() {
      let vm = this;
      if (sessionStorage.getItem("obj")) {
        this.id = JSON.parse(sessionStorage.getItem("obj")).id;
      }
      let obj = {
        goodId: this.detail.id,
        name: this.detail.name,
        num: this.detail.num,
        quantity: this.value,
        price: this.value * this.detail.price,
        vipPrice: this.value * this.detail.vipPrice,
        url: this.detail.url,
        userId: this.id,
        inventory: this.detail.inventory,
        haveSaled: this.detail.haveSaled
      };
      //加入购物车前先请求购物车数据，如果没有则直接添加
      this.$axios.get(this.baseURL + "/users/" + this.id + "/carts").then(res => {
          if (res.data.length !== 0) {
            // 查找是商品编号是否有相等的
            let a = res.data.filter(function(item, index) {
              return item.num == obj.num;
            });
            // 比较编号相等(即过滤出来length!=0)则数量+1
            if (a.length == 0) {
              this.$axios.post(this.baseURL + "/carts", obj).then(res => {
                // this.$router.push({ name: "Cart" });
              });
            } else {
              let newNum = a[0].quantity + obj.quantity;
              this.$axios.patch(this.baseURL + "/carts/" + a[0].id, { quantity: newNum }).then(res => {
                  // this.$router.push({ name: "Cart" });
                });
            }
          } else {
            this.$axios.post(this.baseURL + "/carts", obj).then(res => {
              // this.$router.push({ name: "Cart" });
            });
          }
          setTimeout(function(){
            vm.$router.push({ name: "Cart" });
          },100);
        });
    }
  },
  created() {
    this.goodId = this.$route.params.id;
    this.getDatas();
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
    h2 {
      margin-bottom: 30px;
    }
    .havesaled {
      margin: 10px 0;
    }
    .price {
      background: #f8f8f9;
      margin-bottom: 30px;
      padding: 20px;
      font-size: 18px;
      display: flex;
      align-items: center;
      .orignPrice {
        color: rgb(175, 175, 175);
        text-decoration: line-through;
        margin-right: 40px;
      }
      .vipPrice {
        span {
          color: #ff6700;
        }
      }
    }
    .number {
      margin-bottom: 30px;
      span:last-child {
        margin-left: 20px;
      }
    }
    .noList {
      font-size: 24px;
      color: #ff6700;
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
      .btn:last-child {
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
