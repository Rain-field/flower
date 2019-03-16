<template>
  <Content :style="{ minHeight: '300px', background: '#fff'}" class="order">
    <Breadcrumb :style="{margin: '16px 5px'}">
      <BreadcrumbItem :to="{name:'Home'}">首页</BreadcrumbItem>
      <BreadcrumbItem>我的订单</BreadcrumbItem>
    </Breadcrumb>
    <div class="orderContent">
      <div class="search">
        <Input
          icon="md-search"
          placeholder="商品名称/订单号/收货人"
          style="width: auto"
          v-model="inputFilter"
          @on-click="filterData(0)"
        />
        <DatePicker type="datetimerange" placeholder="时间查询" style="marginLeft:20px; width: 187px"></DatePicker>
        <Select
          style="marginLeft:20px; width:187px"
          @on-change="selectChange"
          clearable
          @on-clear="selectClear"
        >
          <Option value="0">待处理</Option>
          <Option value="1">已完成</Option>
        </Select>
      </div>
      <div class="tabs">
        <div class="tabsDetail">订单详情</div>
        <div class="tabsName">收货人</div>
        <div class="tabsPrice">金额</div>
        <div class="tabsStatus">订单状态</div>
      </div>
      <div class="none" v-if="!orignData.length">你还没有订单呢。去
        <router-link to="{name:'Home'}" tag="span">首页</router-link>下单吧！
      </div>
      <div v-if="orignData.length">
        <div class="item" v-for="(item, index) in data1" :key="index">
          <div class="itemTop">
            <div class="itemTopLeft">
              <span class="time">{{item.time}}</span>
              <span class="num">订单编号：{{item.num}}</span>
            </div>
            <div class="del" @click="del(item.id)">
              <Icon type="ios-trash" size="22"/>
            </div>
          </div>
          <div class="itemBottom">
            <table class="datas">
              <tr class="dataItem">
                <td class="itemDetail">
                  <div v-for="(dataItem, dataIndex) in item.data" :key="dataIndex">
                    <img :src="dataItem.url" alt>
                    <span class="goodName">{{dataItem.name}}</span>
                    <span class="quantity">×{{dataItem.quantity}}</span>
                  </div>
                </td>
                <td class="name">{{item.address.name}}</td>
                <td class="price">￥{{item.price}}</td>
                <td class="status">{{item.status?"已完成":"待处理"}}</td>
              </tr>
            </table>
          </div>
        </div>
        <Page
          :total="total"
          :page-size="limit"
          class-name="page"
          show-sizer
          show-total
          transfer
          @on-change="changPage"
          @on-page-size-change="changePageSize"
        />
      </div>
    </div>
  </Content>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      id: null,
      orignData: [], //原始数据，主要用于筛选初始化后恢复原来的数据
      data: [], //原始数据
      data1: [], //分页后进入表格的数据
      total: 0, //分页总数
      limit: 2, //每页条数
      inputFilter: "" //输入筛选
    };
  },
  methods: {
    getDatas() {
      this.$axios.get("/apis/users/" + this.id + "/orders").then(res => {
        res.data = res.data.reverse();
        this.data = JSON.parse(JSON.stringify(res.data));
        this.orignData = JSON.parse(JSON.stringify(res.data));
        this.dataChange(this.data); //必须使用this.data，不能使用res.data，事关深拷贝
      });
    },
    //因为筛选数据后还要重新调用一次所以单独抽离出来
    dataChange(res) {
      // 如果获取数据的总条数小于每页的条数，就把总数据赋值给表格数据，否则就根据每页条数进行分页
      this.total = res.length; //获取数据条数(不能触发length状态的更新)打印长度为0
      if (this.total < this.limit) {
        this.data1 = JSON.parse(JSON.stringify(res));
      } else {
        // this.data1 = JSON.parse(JSON.stringify(res)).slice(0, this.limit);
        this.data1 = Object.assign([],res.slice(0, this.limit));
      }
    },
    // 改变页码(page为改变后的页码)
    changPage(page) {
      var _start = (page - 1) * this.limit;
      var _end = page * this.limit;
      this.data1 = this.data.slice(_start, _end);
    },
    //改变每页条数
    changePageSize(pageSize) {
      this.limit = pageSize;
      this.getDatas();
    },
    // 删除订单
    del(id) {
      let vm = this;
      vm.$Modal.confirm({
        title: "提示",
        content: "确认要删除吗？",
        onOk: () => {
          this.$axios.delete("/apis/orders/" + id).then(res => {
            vm.$Message.info("删除成功");
            vm.getDatas();
          });
        }
      });
    },
    // 数据过滤
    filterData(type, val) {
      //第一个type为过滤类型，第二个val为要过滤的值
      let vm = this;
      let value = this.inputFilter;
      this.data = JSON.parse(JSON.stringify(this.orignData)); //初始化data
      switch (
        type //type0表示搜索，type1表示订单状态查询，type2表示订单时间查询
      ) {
        case 0:
          //如果输入值为空则保持为原数据
          if (value == "") {
            this.dataChange(this.orignData);
          } else {
            this.data = this.data.filter(function(item, index, arr) {
              let newArr = JSON.parse(JSON.stringify(item.data)); //将商品信息保存起来，用于后续赋值
              item.data = item.data.filter(function(element) {
                //这里的item.data只会保存匹配的项，而需要的确实整个item的所有项
                return element.name.match(value);
              });
              //如果匹配到姓名成功，则直接返回整个item的所有项，否则返回订单号或收货人
              if (item.data.length) {
                item.data = newArr;
                return vm.data[index];
              } else {
                item.data = vm.orignData[index].data;
                return item.num.match(value) || item.address.name.match(value);
              }
            });
          }
          break;
        case 1:
          this.data = this.data.filter(function(item) {
            return item.status == val;
          });
          break;
        case 2:
          console.log(2);
          break;
      }
      this.dataChange(this.data);
    },
    //订单状态选择
    selectChange(value) {
      this.filterData(1, value);
    },
    // 订单状态清空
    selectClear() {
      // this.data = JSON.parse(JSON.stringify(this.orignData));
      // this.dataChange(this.data);
      this.getDatas();
    },
    timeSelected(name) {
      console.log(name);
    }
  },
  created() {
    this.id = JSON.parse(sessionStorage.getItem("obj")).id;
    this.getDatas();
  }
};
</script>

<style lang="">
.search i {
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
      margin-bottom: 10px;
      .tabsDetail {
        width: 50%;
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
    .none {
      height: 64px;
      line-height: 64px;
      text-align: center;
      background-color: rgb(229, 229, 229);
      span {
        cursor: pointer;
        color: #ff6700;
      }
    }
    .item {
      margin-bottom: 20px;
      border-radius: 5px;
      .itemTop {
        padding: 0 20px;
        height: 32px;
        background-color: rgb(245, 245, 245);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid rgb(229, 229, 229);
        border-radius: 5px 5px 0 0;
        border-bottom: none;
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
        .datas {
          font-family: verdana, arial, sans-serif;
          font-size: 11px;
          width: 100%;
          color: #333333;
          border-width: 0;
          border-collapse: collapse;
          border-radius: 0 0 5px 5px;
          overflow: hidden;
          tr {
            border-width: 0;
            border-style: solid;
            border-color: rgb(229, 229, 229);
            td {
              text-align: center;
              border-width: 1px;
              border-style: solid;
              border-color: rgb(229, 229, 229);
            }
            .itemDetail {
              width: 50%;
              text-align: left;
              div {
                padding: 10px 0;
                text-indent: 20px;
                font-size: 12px;
                img {
                  width: 50px;
                  height: 50px;
                  vertical-align: middle;
                }
                .goodName {
                  width: 60%;
                }
                span {
                  margin-left: 20px;
                  display: inline-block;
                }
              }
              div:not(:last-child) {
                border-bottom: 1px solid rgb(229, 229, 229);
              }
            }
            .name,
            .price,
            .status {
              width: 16.66%;
            }
          }
        }
      }
    }
    .page {
      text-align: right;
    }
    // .item:hover .del {
    //   background: url("../../assets/delete.png");
    //   background-size: 100% 100%;
    // }
  }
}
</style>
