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
          <router-link :to="{name:'Address',params:{acNum:'3'}}">这里</router-link>新增
        </div>
        <!-- 配送信息 -->
        <div class="title">配送信息</div>
        <div class="bg">
          <Form :model="delivery" style="padding:25px 0 5px" :label-width="100">
            <FormItem label="配送日期">
              <DatePicker
                type="date"
                :options="options"
                :start-date="new Date()"
                placeholder="Select date"
                style="width: 200px"
                format="yyyy年MM月dd日"
                @on-change="getDate"
              ></DatePicker>
            </FormItem>
            <FormItem label="配送时间">
              <Select style="width:200px" v-model="time">
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
            style="width:40%"
            placeholder="Enter something..."
          />
          <div class="order">
            <div class="quantityTotal">
              已选择
              <span>{{quantityTotal}}</span> 件商品
            </div>
            <div class="priceTotal">
              应付金额：
              <span>￥{{priceTotal}}</span>
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
      id: null,
      isVip:null,
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
      time: "", //日期
      date: "", //时间
      tips: "", //留言
      quantityTotal: 0, //总数量
      priceTotal: 0, //总价
      url: null,
      options: {
          disabledDate (date) {
              return date && date.valueOf() < Date.now() - 86400000;//86400000代表一同的时间
          }
      },//日期选择限制
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
                        src: this.data[params.index].url
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
          key: "quantity"
        }
      ],
      data: []
    };
  },
  methods: {
    getDatas() {
      this.$axios.get(this.baseURL+"/users/" + this.id + "/address").then(res => {
        this.cityList = res.data;
      });
      this.data = JSON.parse(sessionStorage.getItem("orderArr"));
      for (let i = 0; i < this.data.length; i++) {
        this.quantityTotal += Number(this.data[i].quantity);
        this.priceTotal += Number(this.data[i].price);
      }
    },
    //选择地址
    addressSelected(value) {
      this.$axios.get(this.baseURL+"/address/" + value).then(res => {
        this.addressDetail = res.data;
      });
    },
    //获取配送日期
    getDate(value) {
      this.date = value;
    },
    // 日期格式化
    formatDate (date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h
        let M = date.getMinutes();
        M = M < 10 ? ('0' + M) : M
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s
        return y + '-' + m + '-' + d + ' '+ h +':' + M + ':' + s;
    },
    //订单提交
    toSubmit() {
      let a = new Date();
      let obj = {
        address: this.addressDetail,
        date: this.date + this.time,
        data: this.data,
        tips: this.tips,
        price: this.priceTotal,
        quantity: this.quantityTotal,
        userId:this.id,
        status:0,
        userName:sessionStorage.getItem("name"),
        time:this.formatDate(a) ,//下单时间
        isDel:0,
        num:"0"+this.id+(String(a-0).substr(8))+Math.floor(Math.random()*90+10)//订单编号：0+id+后5毫秒时间戳+2位随机数
      };
      // 验证地址和送货时间是否输入
      if(! Object.keys(obj.address).length || !this.date || !this.time){
        this.$Message.warning("请补全订单信息!");
      }else{
        // 添加数据
        this.$axios.post(this.baseURL+"/orders", obj).then(res => {
          for (let i = 0; i < obj.data.length; i++) {
          // 修改商品库存
            let newIventory = obj.data[i].inventory - obj.data[i].quantity;
            let newHaveSaled =obj.data[i].haveSaled+obj.data[i].quantity;
            this.$axios.patch(this.baseURL+"/goods/"+obj.data[i].goodId,{inventory:newIventory,haveSaled:newHaveSaled})
          //清空购买商品在购物车的数据
            if(obj.data[i].vipPrice){
              this.$axios.delete(this.baseURL+"/carts/"+obj.data[i].id);
            }
          }
        })
        
        if(obj.price>99 && !this.isVip){
          this.$axios.patch(this.baseURL+"/users/"+this.id,{isVip:1});
          this.$Message.success("恭喜您达成会员条件，系统自动为您加入会员！");
        }else{
          this.$Message.success("恭喜您下单成功！");
        }
        this.$router.push({name:'Home'});
      }
     
    }
  },
  created() {
    this.id = JSON.parse(sessionStorage.getItem("obj")).id;
    this.isVip = Number(sessionStorage.getItem("isVip"));
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

