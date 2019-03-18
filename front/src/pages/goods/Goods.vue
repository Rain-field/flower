<template>
  <Content :style="{ minHeight: '300px', background: '#f5f7f9;'}" class="goods">
    <div class="goodsContent">
      <div class="tabs">
        <span>销量
          <Icon type="md-arrow-dropup"/>
        </span>
        <span>时间
          <Icon type="md-arrow-dropdown"/>
        </span>
        <span>价格
          <Icon type="md-arrow-dropup"/>
        </span>
      </div>
      <div class="flower_sections">
        <div class="flower_section" v-for="(item, index) in lists" :key="index">
          <div class="flower_img" @click="toDetail(item.id)">
            <img :src="item.url" alt>
          </div>
          <div class="flower_price">
            ￥{{item.vipPrice}}
            <span class="flower_high_price">￥{{item.price}}</span>
          </div>
          <div class="flower_name" :title="item.info">
            <span>{{item.name}}</span>
            /{{item.info}}
          </div>
          <div class="flower_number">
            <div class="inventory">库存：{{item.inventory}}</div>
            <div class="haveSaled">销量：{{item.haveSaled}}</div>
          </div>
          <div class="flower_features">
            <div class="flower_carts" @click="toCart(item.id)">
              <img src="../../assets/cart.png" alt>
            </div>
            <div class="flower_buy" @click="toBuy(item.id)">立即购买</div>
          </div>
        </div>
      </div>
    </div>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      isVip: null,
      lists: []
    };
  },
  methods: {
    getDatas() {
      this.$axios
        .get("/apis/goods/?type=" + this.$route.params.id)
        .then(res => {
          this.lists = res.data;
          this.lists.forEach((item, index) => {
            item.url = require("@/" + item.url);
          });
        });
    },
    toDetail(userId) {
      this.$router.push({ name: "GoodsDetail", params: { id: userId } });
    },
    toBuy(userId) {
      this.isVip = Number(sessionStorage.getItem("isVip"));
      var detail = [];
      this.$axios.get("/apis/goods/" + userId).then(res => {
        detail = res.data;
        let arr = [
          {
            goodId: detail.id,
            name: detail.name,
            num: detail.num,
            quantity: 1,
            price: null,
            url: require("@/" + detail.url),
            inventory: detail.inventory,
            haveSaled: detail.haveSaled
          }
        ];
        arr[0].price = this.isVip ? detail.vipPrice : detail.price;
        this.$router.push({ name: "OrderConfirm" });
        sessionStorage.setItem("orderArr", JSON.stringify(arr));
      });
    },
    toCart(userId) {
      this.id = JSON.parse(sessionStorage.getItem("obj")).id;
      var detail = [];
      this.$axios.get("/apis/goods/" + userId).then(res => {
        detail = res.data;
        let obj = {
          goodId: detail.id,
          name: detail.name,
          num: detail.num,
          quantity: 1,
          price:  detail.price,
          vipPrice:  detail.vipPrice,
          url: require("@/" + detail.url),
          userId: this.id,
          inventory: detail.inventory,
          haveSaled: detail.haveSaled
        };
        //加入购物车前先请求购物车数据，如果没有则直接添加
        this.$axios.get("/apis/users/" + this.id + "/carts").then(res => {
          if (res.data.length !== 0) {
            // 查找是商品编号是否有相等的
            let a = res.data.filter(function(item, index) {
              return item.num == obj.num;
            });
            // 比较编号相等(即过滤出来length!=0)则数量+1
            if (a.length == 0) {
              this.$axios.post("/apis/carts", obj).then(res => {
                // this.$router.push({ name: "Cart" });
                this.$Message.success("成功添加到购物车!");
              });
            } else {
              let newNum = a[0].quantity + obj.quantity;
              this.$axios
                .patch("/apis/carts/" + a[0].id, { quantity: newNum })
                .then(res => {
                //   this.$router.push({ name: "Cart" });
                this.$Message.success("成功添加到购物车!");
                });
            }
          } else {
            this.$axios.post("/apis/carts", obj).then(res => {
            //   this.$router.push({ name: "Cart" });
                this.$Message.success("成功添加到购物车!");
            });
          }
        });
      });
    }
  },
  created() {
    this.getDatas();
  }
};
</script>

<style>
.ivu-btn-text.active,
.ivu-btn-text:active {
  color: #ff6700;
}
.ivu-btn-text:hover {
  color: #ff6700;
}
</style>


<style lang="less" scoped>
.goods {
  margin-top: 20px;
  width: 1240px;
  margin: auto;

  .goodsContent {
    .tabs {
      height: 32px;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      display: flex;
      background-color: rgb(245, 245, 245);
      border-radius: 5px;
      margin-bottom: 10px;
      color: #515a6e;
      span {
        cursor: pointer;
        margin-left: 20px;
      }
    }
    .flower_sections {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      font-size: 14px;
      .flower_section {
        cursor: pointer;
        width: 18%;
        padding: 10px;
        border-radius: 5px;
        background-color: #fff;
        margin-left: 2%;
        div {
          margin-top: 5px;
        }
        .flower_img {
          height: 203px;
          img {
            border-radius: 5px;
            width: 100%;
            height: 100%;
          }
        }
        .flower_name {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          span {
            color: black;
          }
        }
        .flower_price {
          font-weight: bolder;
          color: #ff6700;
          .flower_high_price {
            color: #9a9a9a;
            font-weight: lighter;
            text-decoration: line-through;
          }
        }
        .flower_number {
          display: flex;
          justify-content: space-between;
        }
        .flower_features {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          div {
            height: 40px;
            line-height: 30px;
          }
          .flower_carts {
            width: 40px;
            background-color: #ff6700;
            border-radius: 50%;
            img {
              width: 60%;
              margin-left: 18%;
              margin-top: 20%;
              height: 60%;
            }
          }
          .flower_buy {
            padding: 0px 15px;
            height: 30px;
            background-color: #ff6700;
            color: white;
            border-radius: 10px;
          }
        }
      }
      .flower_section:nth-child(n + 6) {
        margin-top: 1%;
      }
    }
  }
}
</style>
