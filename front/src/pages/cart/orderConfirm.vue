<template>
  <Layout>
    <Content :style="{ minHeight: '300px', background: '#fff'}" id="orderConfirm">
      <Breadcrumb :style="{margin: '16px 5px'}">
        <BreadcrumbItem :to="{name:'Home'}">首页</BreadcrumbItem>
        <BreadcrumbItem :to="{name:'Cart'}">购物车</BreadcrumbItem>
        <BreadcrumbItem>订单信息</BreadcrumbItem>
      </Breadcrumb>
      <div class="wrap">
        <!-- 收货信息 -->
        <div class="title">收货人信息</div>
        <div class="bg" v-if="cityList.length">
          <Form style="padding:5px 25px">
            <FormItem label="请选择地址" style="marginTop:20px">
              <Select style="width:350px" @on-change="addressSelected">
                <Option
                  v-for="item in cityList"
                  :value="item.id"
                  :key="item.name"
                  :label="item.name"
                >
                  <span>{{item.name}}</span>
                  <span style="float:right;color:#ccc">{{item.address}}</span>
                </Option>
              </Select>
            </FormItem>
          </Form>
        </div>
        <div v-if="!cityList.length" class="bg msg">还没有添加地址,点
          <router-link :to="{name:'Address'}">这里</router-link>新增
        </div>
        <!-- 配送信息 -->
        <div class="title">配送信息</div>
        <div class="bg">
          <Form :model="delivery" style="padding:25px 0 5px" :label-width="100">
            <FormItem label="配送日期">
              <DatePicker
                type="date"
                :start-date="new Date(1991, 4, 14)"
                placeholder="Select date"
                style="width: 200px"
                @on-change="getDate"
              ></DatePicker>
            </FormItem>
            <FormItem label="配送时间">
              <Select style="width:200px">
                <Option v-for="(item,index) in timeList" :value="item" :key="index">{{ item }}</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
        <div class="title">商品清单</div>
        <div class="bg">
          <Table :columns="columns" :data="data"></Table>
          <div class="tips">备注留言：</div>
          <Input
            v-model="tips"
            type="textarea"
            :row="4"
            style="width:20%"
            placeholder="Enter something..."
          />
          <div class="order">
            <div class="numTotal">
              已选择
              <span>{{numTotal}}</span> 件商品
            </div>
            <div class="saleTotal">
              应付金额：
              <span>￥{{saleTotal}}</span>
            </div>
            <!-- <routerLink class="toSet btn" tag="div" to="orderConfirm" @click="toSet">去结算</routerLink> -->
            <div class="toOrder btn" @click="toSubmit">确认订单</div>
          </div>
        </div>
      </div>
    </Content>
  </Layout>
</template>

<script>
export default {
  name: "OrderConfirm",
  data() {
    return {
      cityList: [], //地址列表
      addressDetail: [], //地址选择详情
      delivery: {}, //配送信息列表
      timeList: [
        "不限时段",
        "08-10点",
        "10-12点",
        "12-14点",
        "14-16点",
        "16-18点",
        "18-20点",
        "20-22点"
      ], //时间表
      time: "",//日期
      date:"",//时间
      tips: "", //留言
      numTotal: 0, //总数量
      saleTotal: 0, //总价
      src: { dizhi: require("../../assets/flower/001.jpg"), url: "" },
      columns: [
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
                        src: this.src.dizhi
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
          key: "num"
        }
      ],
      data: []
    };
  },
  methods: {
    getDatas() {
      this.$axios.get("http://localhost:3000/address").then(res => {
        this.cityList = res.data;
      });
      this.$axios.get("http://localhost:3000/orders").then(res => {
        this.data = res.data[0].data;
        this.numTotal = res.data[0].num;
        this.saleTotal = res.data[0].price;
      });
    },
    //选择地址
    addressSelected(value) {
      this.$axios.get("http://localhost:3000/address/" + value).then(res => {
        // console.log(res.data);
        this.addressDetail = res.data;
      });
    },
    //获取配送日期
    getDate(value) {
      this.date = value;
    },
    //订单提交
    toSubmit() {
      let obj = { address: [], date: "", data: [], tips: "", price: 0, num: 0 };
      obj.address = this.addressDetail;
      obj.date = this.date +"/"+ this.time;
      obj.tips = this.tips;
      obj.data = this.data;
      obj.price = this.saleTotal;
      obj.num = this.numTotal;
      console.log(obj);
    }
  },
  created() {
    this.getDatas();
  }
};
</script>


<style lang="less" scoped>
#orderConfirm {
  width: 1240px;
  margin: auto;
  .wrap {
    padding: 0 40px;
    .title {
      font-size: 18px;
      margin: 15px 0;
      font-weight: bold;
    }
    .bg {
      background: #f8f8f9;
      .tips {
        margin: 20px 0;
      }
      .order {
        display: flex;
        flex-direction: column;
        div {
          align-self: flex-end;
          margin: 10px 50px;
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
        span {
          color: #ff6700;
          font-size: 20px;
        }
      }
    }
    .bg:last-child {
      margin-bottom: 40px;
    }
    .msg {
      padding: 10px;
      text-align: center;
    }
  }
}
</style>

