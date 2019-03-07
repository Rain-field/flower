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
        <div v-if="cityList.length">
          <Form>
            <FormItem label="请选择地址">
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
          <!-- <Form
            :model="addressList"
            class="bg"
            :label-width="100"
            style="padding:5px 0"
            v-if="Object.keys(addressList).length"
          >
            <FormItem label="收货人：">
              <Input v-model="addressList.name" style="width:auto" readonly></Input>
            </FormItem>
            <FormItem label="电话：">
              <Input v-model="addressList.tel" style="width:auto" readonly></Input>
            </FormItem>
            <FormItem label="地址：">
              <Input v-model="addressList.address" style="width:auto" readonly></Input>
            </FormItem>
          </Form>-->
        </div>
        <div v-if="!cityList.length" class="bg msg">还没有添加地址,点
          <router-link :to="{name:'Address'}">这里</router-link>新增
        </div>
        <!-- 配送信息 -->
        <div class="title">配送信息</div>
        <div class="bg">
          <Form :model="delivery" style="padding:5px 0" :label-width="100">
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
              <Select v-model="time" style="width:200px" @on-change="getTime">
                <Option v-for="(item,index) in timeList" :value="item" :key="index">{{ item }}</Option>
              </Select>
            </FormItem>tips:配送信息不填写默认明天上午送达
          </Form>
        </div>
        <!-- <div class="title">商品清单</div> -->
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
      //   addressList: {}, //地址详情
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
      time: ""
    };
  },
  methods: {
    getDatas() {
      this.$axios.get("http://localhost:3000/address").then(res => {
        this.cityList = res.data;
      });
    },
    //选择地址
    addressSelected(value) {
      //   this.$axios.get("http://localhost:3000/address/" + value).then(res => {
      //     this.addressList = res.data;
      //   });
      // console.log(value)
    },
    //获取配送日期
    getDate(value) {
        console.log(value);
    },
    // 选择配送时间
    getTime(value) {
      console.log(value);
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
    }
    .msg {
      padding: 10px;
      text-align: center;
    }
  }
}
</style>

