<template>
  <Content :style="{padding: '0 20px', minHeight: '380px', background: '#fff'}" id="cart">
    <Breadcrumb :style="{margin: '16px 5px'}">
      <BreadcrumbItem :to="{name:'Home'}">首页</BreadcrumbItem>
      <BreadcrumbItem>购物车</BreadcrumbItem>
    </Breadcrumb>
    <Table
      ref="selection"
      :columns="carColumn"
      :data="carData"
      no-data-text="购物车还是空的哦,去<a href='/index'>首页</a>看看吧"
      @on-selection-change="selectChange"
    ></Table>
    <div class="set" v-if="carData.length">
      <div class="set_left">
        <button class="btn" @click="delSelected()">删除选中商品</button>
      </div>
      <div class="set_right">
        <div class="quantityTotal">
          已选择
          <span>{{quantityTotal}}</span> 件商品
        </div>
        <div class="priceTotal">
          应付金额：
          <span>￥{{priceTotal}}</span>
        </div>
        <div class="toBuy btn" @click="toBuy">去结算</div>
      </div>
    </div>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      id:null,
      goodsList: [],
      carColumn: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "商品名称",
          key: "name",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  padding: "20px 0",
                  alignItems: "center"
                }
              },
              [
                h(
                  "div",
                  {
                    style: {
                      marginRight: "15px",
                      width: "50px",
                      height: "50px"
                    },
                    on: {
                      click: () => {
                        this.show(params.index);
                      }
                    }
                  },
                  [
                    h("img", {
                      attrs: {
                        src: this.carData[params.index].url
                      },
                      style: {
                        width: "100%",
                        height: "100%"
                      }
                    })
                  ]
                ),
                h("div", params.row.name)
              ]
            );
          }
        },
        {
          title: "价格",
          align: "center",
          key: "price",
          render: (h, params) => {
            return h("span", "￥" + params.row.price);
          }
        },
        {
          title: "数量",
          align: "center",
          key: "quantity",
          render: (h, params) => {
            return h("InputNumber", {
              props: {
                value: Number(this.carData[params.index].quantity),
                min: 1,
                max: 20
              },
              on: {
                "on-change": value => {
                  this.carData[params.index].quantity = value;
                }
              }
            });
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "button",
                {
                  attrs: {
                    class: "btn"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      carData: []
    };
  },
  computed: {
    // 计算购物车总数量
    quantityTotal() {
      let qTotal = 0;
      this.goodsList.forEach(element => {
        qTotal += Number(element.quantity);
      });
      return nTotal;
    },
    // 计算购物车总价格
    priceTotal() {
      let pTotal = 0;
      this.goodsList.forEach(element => {
        pTotal += element.quantity * element.price;
      });
      return sTotal;
    }
  },
  methods: {
    remove(index) {
      this.$axios.delete("/apis/carts/" + index).then(res => {
        this.$Message.success("删除成功");
        this.getDatas();
      });
    },
    // 商品选中的切换状态
    selectChange(selection) {
      this.goodsList = selection;
    },
    // 删除选中的商品
    delSelected() {
      this.goodsList.forEach(element => {
        this.$axios
          .delete("http://localhost:3000/goods/" + element.id)
          .then(res => {
            this.getDatas();
          });
      });
    },
    // 获取数据
    getDatas() {
      this.$axios.get("/apis/users/"+this.id+"/carts").then(res => {
        this.carData = res.data;
        // 如果是会员，价格都变为会员价
        if(JSON.parse(sessionStorage.getItem("obj")).isVip){
          for (let i = 0; i < this.carData.length; i++) {
            this.carData[i].price = this.carData[i].vipPrice;
          }
        }
      });
    },
    toBuy() {
      let obj = { price: 0, num: 0, data: [] };
      obj.price = this.priceTotal;
      obj.num = this.quantityTotal;
      obj.data = this.goodsList;
      // if (obj.data.length) {
      //   this.$axios.post("http://localhost:3000/orders", obj).then(res => {
          this.$router.push({ name: "OrderConfirm" });
      //   });
      // } else {
      //   this.$Message.error("请选择商品");
      // }
    }
  },
  created() {
    this.id = JSON.parse(sessionStorage.getItem("obj")).id;
    this.getDatas();
  }
};
</script>

<style>
.ivu-checkbox-checked .ivu-checkbox-inner {
  border-color: #ff6700;
  background-color: #ff6700;
}
.ivu-checkbox-checked:hover .ivu-checkbox-inner {
  border-color: #ff6700;
}
.ivu-table-header th {
  height: 60px;
}
.ivu-table-tip a {
  color: #ff6700;
}
.btn {
  cursor: pointer;
  outline: 0;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  user-select: none;
  padding: 5px 15px 6px;
  font-size: 12px;
  border-radius: 4px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear, box-shadow 0.2s linear;
  color: #fff;
  background-color: #ff6700;
  border-color: #ff6700;
}
.btn:hover {
  background-color: #fa9d5f;
  border-color: #fa9d5f;
}
</style>

<style lang="less" scoped>
#cart {
  width: 1240px;
  margin: auto;
  .set {
    margin: 20px 0;
    height: 60px;
    background-color: #f8f8f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .set_right {
      display: flex;
      div:not(:last-child) {
        margin-right: 30px;
      }
      span {
        color: #ff6700;
        font-size: 20px;
      }
    }
  }
}
</style>


