<template>
  <Content :style="{ minHeight: '300px', background: '#fff'}" class="order">
    <Breadcrumb :style="{margin: '16px 5px'}">
      <BreadcrumbItem :to="{name:'Home'}">首页</BreadcrumbItem>
      <BreadcrumbItem>我的订单</BreadcrumbItem>
    </Breadcrumb>
    <div class="orderContent">
      <div class="search">
        <Input suffix="md-search" placeholder="商品名称/订单号" style="width: auto"/>
      </div>
      <div class="tabs">
        <div class="searchTime">
          <Dropdown @on-click="timeSelected">
            <a href="javascript:void(0)">近三个月订单
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="1">近一个月订单</DropdownItem>
              <DropdownItem name="2">近三个月订单</DropdownItem>
              <DropdownItem name="3">今年内订单</DropdownItem>
              <DropdownItem name="4">2018年订单</DropdownItem>
              <DropdownItem name="5">2017年订单</DropdownItem>
              <DropdownItem name="6">2016年以前订单</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="tabsDetail">订单详情</div>
        <div class="tabsName">收货人</div>
        <div class="tabsPrice">金额</div>
        <div class="tabsStatus">
          <Dropdown>
            <a href="javascript:void(0)">订单状态
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="1">已完成</DropdownItem>
              <DropdownItem name="2">待处理</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div class="none">你还没有订单呢。去 <router-link to="{name:'Home'}" tag="span">首页</router-link> 下单吧！</div>
      <div class="item">
        <div class="itemTop">
          <div class="itemTopLeft">
            <span class="time">2019-03-13 13:04:46</span>
            <span class="num">订单号： 89612867779</span>
          </div>
          <div class="del"></div>
        </div>
        <div class="itemBottom">
          <div class="datas">
            <div class="dataItem">
              <div class="goodImg">
                <img src="../../assets/flower/001.jpg" alt>
              </div>
              <div class="goodName">博沃尼克 铝合金自行车脚撑中支撑支架子 山地车边撑停车架脚架单车零配件 黑色</div>
              <div class="quanity">×1</div>
            </div>
            <div class="dataItem">
              <div class="goodImg">
                <img src="../../assets/flower/001.jpg" alt>
              </div>
              <div class="goodName">博沃尼克 铝合金自行车脚撑中支撑支架子 山地车边撑停车架脚架单车零配件 黑色</div>
              <div class="quanity">×1</div>
            </div>
          </div>
          <div class="name">雷梁</div>
          <div class="price">￥33.5</div>
          <div class="status">已完成</div>
        </div>
      </div>
    </div>
  </Content>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      id: null
    };
  },
  methods: {
    getDatas() {
      this.$axios.get("/apis/orders");
    },
    timeSelected(name) {
      console.log(name);
    }
  }
};
</script>

<style lang="">
  .search i{
    cursor: pointer;
  }
</style>

<style lang="less" scoped>
.order {
  margin-top: 20px;
  width: 1240px;
  margin: auto;
  .orderContent {
    width: 90%;
    margin: auto;
    font-size: 12px;
    .search {
      margin-bottom: 20px;
    }
    .tabs {
      height: 32px;
      line-height: 32px;
      text-align: center;
      display: flex;
      background-color: rgb(245, 245, 245);
      border-radius: 5px;
      margin-bottom: 20px;
      .searchTime{
        width: 10%;
        a{
          color: #515a6e;
        }
      }
      .tabsDetail {
        width: 40%;
      }
      .tabsName,
      .tabsPrice,
      .tabsStatus {
        width: 16.66%;
        a {
          color: #515a6e;
        }
      }
    }
    .none{
      height: 64px;
      line-height: 64px;
      text-align: center;
      background-color: rgb(229, 229, 229);
      span{
        cursor: pointer;
        color: #ff6700;
      }
    }
    .item {
      margin-bottom: 20px;
      border-radius: 5px;
      border: 1px solid rgb(229, 229, 229);
      .itemTop {
        padding: 0 20px;
        height: 32px;
        background-color: rgb(245, 245, 245);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .num {
          margin-left: 20px;
        }
        .del {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }
      .itemBottom {
        display: flex;
        align-items: center;
        height: 100%;
        & > div:not(:last-child) {
          border-right: 1px solid rgb(229, 229, 229);
        }
        .datas {
          width: 50%;
          .dataItem {
            margin: 10px 0;
            display: flex;
            align-items: center;
            & > div {
              margin-left: 20px;
            }
            .goodImg {
              width: 50px;
              height: 50px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .goodName {
              width: 60%;
            }
          }
          .dataItem:not(:first-child) {
            border-top: 1px solid rgb(229, 229, 229);
          }
        }
        .name,
        .price,
        .status {
          width: 16.66%;
          text-align: center;
          height: 100%;
        }
      }
    }
    .item:hover .del {
      background: url("../../assets/delete.png");
      background-size: 100% 100%;
    }
  }
}
</style>
