<template>
  <Content class="goods">
    <div class="goodsContent">
      <div class="tabs">
        <span :class="[active==1?'active':'']" @click="tabsChange(1)">销量
          <Icon type="md-arrow-dropdown"/>
        </span>
        <span :class="[active==2?'active':'']" @click="tabsChange(2)">新品
          <Icon type="md-arrow-dropdown"/>
        </span>
        <span :class="[active==3?'active':'']" @click="tabsChange(3)">价格
          <Icon :type="status==0?'md-arrow-dropdown':'md-arrow-dropup'"/>
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
            <span>{{item.goodName}}</span>
            {{item.info}}我说那么多的事情你怎么就是不知道呢
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
     <Page
          :total="total"
          :page-size="limit"
          class-name="page"
          prev-text="上一页" next-text="下一页"
          show-elevator
          transfer
          @on-change="changPage"
        />
  </Content>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      isVip: null,
      data:[],
      lists: [],
      active: 0, //显示激活状态的类
      status: 0, //升序降序状态,0表示降序，1表示升序
      total: 0, //分页总数
      limit: 10, //每页条数
    };
  },
  methods: {
    getDatas() {
      this.$axios
        .get(this.baseURL+"/goods/?online=1&type=" + this.$route.params.id)
        .then(res => {
          this.data = JSON.parse(JSON.stringify(res.data));
          this.data.forEach((item, index) => {
            item.url = require("@/" + item.url);
          });
          this.dataChange(this.data);
        });
    },
    //因为数据排序后还要重新调用一次所以单独抽离出来
    dataChange(res) {
      // 如果获取数据的总条数小于每页的条数，就把总数据赋值给表格数据，否则就根据每页条数进行分页
      this.total = res.length; //获取数据条数(不能触发length状态的更新)打印长度为0
      if (this.total < this.limit) {
        this.lists = JSON.parse(JSON.stringify(res));
      } else {
        // this.lists = JSON.parse(JSON.stringify(res)).slice(0, this.limit);
        this.lists = Object.assign([], res.slice(0, this.limit));
      }
    },
    // 改变页码(page为改变后的页码)
    changPage(page) {
      var _start = (page - 1) * this.limit;
      var _end = page * this.limit;
      this.lists = this.data.slice(_start, _end);
    },
    // 选项卡切换+排序功能
    tabsChange(id) {
      this.active = id;
      switch (id) {
        case 1:
          // 销量降序
          this.$axios
            .get(
              this.baseURL+"/goods/?online=1&type=" +
                this.$route.params.id +
                "&_sort=haveSaled&_order=desc"
            )
            .then(res => {
              this.data = JSON.parse(JSON.stringify(res.data));
              this.data.forEach((item, index) => {
                item.url = require("@/" + item.url);
              });
              this.dataChange(this.data);
              this.status = 1;
            });
          break;
        case 2:
          // 时间降序
          this.$axios
            .get(this.baseURL+"/goods/?online=1&type=" + this.$route.params.id)
            .then(res => {
              this.data = JSON.parse(JSON.stringify(res.data)).reverse();
              this.data.forEach((item, index) => {
                item.url = require("@/" + item.url);
              });
              this.dataChange(this.data);
            });
          break;
        case 3:
          this.$axios
            .get(
              this.baseURL+"/goods/?online=1&type=" +
                this.$route.params.id +
                "&_sort=vipPrice&_order=desc"
            )
            .then(res => {
          // 价格降序
              if (this.status) {
              this.data = JSON.parse(JSON.stringify(res.data));
                this.data.forEach((item, index) => {
                  item.url = require("@/" + item.url);
                });
              }else{
          // 价格升序
              this.data = JSON.parse(JSON.stringify(res.data)).reverse();
                this.data.forEach((item, index) => {
                  item.url = require("@/" + item.url);
                });
              }
              this.dataChange(this.data);
              this.status = !this.status;
            });
          break;
      }
    },
    toDetail(userId) {
      this.$router.push({ name: "GoodsDetail", params: { id: userId } });
    },
    toBuy(userId) {
      this.isVip = Number(sessionStorage.getItem("isVip"));
      var detail = [];
      this.$axios.get(this.baseURL+"/goods/" + userId).then(res => {
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
      if (sessionStorage.getItem("obj")) {
        this.id = JSON.parse(sessionStorage.getItem("obj")).id;
      }
      var detail = [];
      this.$axios.get(this.baseURL+"/goods/" + userId).then(res => {
        detail = res.data;
        let obj = {
          goodId: detail.id,
          name: detail.name,
          num: detail.num,
          quantity: 1,
          price: detail.price,
          vipPrice: detail.vipPrice,
          url: require("@/" + detail.url),
          userId: this.id,
          inventory: detail.inventory,
          haveSaled: detail.haveSaled
        };
        //加入购物车前先请求购物车数据，如果没有则直接添加
        this.$axios.get(this.baseURL+"/users/" + this.id + "/carts").then(res => {
          if (res.data.length !== 0) {
            // 查找是商品编号是否有相等的
            let a = res.data.filter(function(item, index) {
              return item.num == obj.num;
            });
            // 比较编号相等(即过滤出来length!=0)则数量+1
            if (a.length == 0) {
              this.$axios.post(this.baseURL+"/carts", obj).then(res => {
                // this.$router.push({ name: "Cart" });
                this.$Message.success("成功添加到购物车!");
              });
            } else {
              let newNum = a[0].quantity + obj.quantity;
              this.$axios
                .patch(this.baseURL+"/carts/" + a[0].id, { quantity: newNum })
                .then(res => {
                  //   this.$router.push({ name: "Cart" });
                  this.$Message.success("成功添加到购物车!");
                });
            }
          } else {
            this.$axios.post(this.baseURL+"/carts", obj).then(res => {
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
    padding: 10px 0;
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
        padding: 0 20px;
        margin-left: 20px;
      }
      .active {
        background-color: #ff6700;
        color: white;
      }
    }
    .flower_sections {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      font-size: 14px;
      .flower_section {
        border: 1px solid #e3e3e3;
        cursor: pointer;
        width: 17.6%;
        padding: 10px;
        border-radius: 5px;
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
          white-space:nowrap;
          text-overflow:ellipsis;
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
    .page {
      text-align: right;
      margin: 20px 0;
    }
}
</style>
