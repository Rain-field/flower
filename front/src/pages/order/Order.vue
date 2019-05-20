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
        <DatePicker
          type="daterange"
          placeholder="时间段查询"
          v-model="timeValue"
          style="marginLeft:20px; width: 280px"
          :options="options"
          @on-change="timeSelected"
          @on-clear="selectClear"
        ></DatePicker>
        <Select
          style="marginLeft:20px; width:187px"
          @on-change="selectChange"
          placeholder="订单状态"
          clearable
          @on-clear="selectClear"
          v-model="selectValue"
        >
          <Option value="0">待处理</Option>
          <Option value="1">待收货</Option>
          <Option value="2">已完成</Option>
          <Option value="3">已取消</Option>
          <Option value="4">退换货</Option>
        </Select>
      </div>
      <div class="tabs">
        <div class="tabsDetail">订单详情</div>
        <div class="tabsName">收货人</div>
        <div class="tabsPrice">金额</div>
        <div class="tabsStatus">订单状态</div>
      </div>
      <div class="none" v-if="!orignData.length">
        你还没有订单呢。去
        <router-link to="{name:'Home'}" tag="span">首页</router-link>下单吧！
      </div>
      <!-- <div class="none" v-if="!data.length">没有找到符合要求的订单！</div> -->
      <div v-if="orignData.length">
        <div class="item" v-for="(item, index) in data" :key="index">
          <div v-if="!item.del">
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
                      <span class="price">{{dataItem.price}}</span>
                    </div>
                  </td>
                  <td class="name">{{item.address.name}}</td>
                  <td class="price">￥{{item.price}}</td>
                  <td class="status">
                    <span>{{statusChange(item.status)}}</span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="cancel" v-if="item.status !== 3 && item.status !== 4">
              <button class="btn" v-if="item.status == 1" @click="getConfirm(item.id)">确认收货</button>
              <button class="btn" v-if="item.status == 1 || item.status == 0" @click="cancel(item.id,'已为您成功取消订单!')">取消订单</button>
              <button class="btn" v-if="item.status == 2" @click="cancel(item.id,'退换货成功!')">退换货</button>
            </div>
          </div>
        </div>
        <Page
          :total="total"
          :page-size="limit"
          class-name="page"
          show-sizer
          show-total
          transfer
          :page-size-opts="pageSize"
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
      total: 0, //分页总数
      limit: 5, //每页条数
      pageSize: [2, 5, 10, 15, 20], //自定义每页条数
      inputFilter: "", //输入筛选
      timeValue: "", //时间值
      selectValue: "", //状态值
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      } //日期选择限制
    };
  },
  methods: {
    cancel(count,msg) {
      let vm = this;
      let state = 0;
      if(msg == '退换货成功!'){
        state = 4;
      }else{
        state = 3;
      }
      this.$axios
        .patch(this.baseURL + "/orders/" + count, { status: state })
        .then(res => {
          vm.$Message.info(msg);
          vm.getDatas();
        });
    },
    //状态
    statusChange(count) {
      if(count == 0){
        return '待发货'
      }else if(count == 1){
        return '待收货'
      }else if(count == 2) {
        return '已完成'
      }else if(count == 3){
        return '已取消'
      }else{
        return '退换货'
      }
    },
    getDatas() {
      this.$axios
        .get(this.baseURL + "/orders?userId=" + this.id +"&isDel=0")
        .then(res => {
          res.data = res.data.reverse();
          this.data = JSON.parse(JSON.stringify(res.data));
          this.orignData = JSON.parse(JSON.stringify(res.data));
          this.dataChange(this.orignData); //必须使用this.data，不能使用res.data，事关深拷贝
        });
    },
    //因为筛选数据后还要重新调用一次所以单独抽离出来
    dataChange(res) {
      // 如果获取数据的总条数小于每页的条数，就把总数据赋值给表格数据，否则就根据每页条数进行分页
      this.total = res.length; //获取数据条数(不能触发length状态的更新)打印长度为0
      if (this.total < this.limit) {
        this.data = JSON.parse(JSON.stringify(res));
      } else {
        this.data = JSON.parse(JSON.stringify(res)).slice(0, this.limit);
        // this.data = Object.assign([], res.slice(0, this.limit));
      }
    },
    // 改变页码(page为改变后的页码)
    changPage(page) {
      var _start = (page - 1) * this.limit;
      var _end = page * this.limit;
      this.data = this.orignData.slice(_start, _end);
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
          this.$axios
            .patch(this.baseURL + "/orders/" + id, { isDel: 1 })
            .then(res => {
              vm.$Message.info("删除成功");
              vm.total = 0;
              vm.limit = 5;
              vm.getDatas();
            });
        }
      });
    },
    // 确认收货
    getConfirm(orderId) {
      let vm = this;
      vm.$Modal.confirm({
        title: "提示",
        content: "确认收货吗？",
        onOk() {
          vm.$axios
            .patch(vm.baseURL + "/orders/" + orderId, { status: 2 })
            .then(res => {
              vm.$Message.success("订单处理成功");
              vm.getDatas();
            });
        }
      });
    },
    // 数据过滤
    filterData(type, val) {
      //第一个type为过滤类型，第二个val为要过滤的值
      let vm = this;
      let value = vm.inputFilter;
      vm.data = JSON.parse(JSON.stringify(vm.orignData)); //初始化data
      switch (
        type //type0表示搜索，type1表示订单状态查询，type2表示订单时间查询
      ) {
        case 0:
          this.selectValue = "";
          this.timeValue = "";
          //如果输入值为空则保持为原数据
          if (value == "") {
            vm.dataChange(vm.orignData);
          } else {
            vm.data = vm.data.filter(function(item, index, arr) {
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
            vm.dataChange(vm.data);
          }
          break;
        case 1: //状态选择
          vm.data = vm.data.filter(function(item) {
            return item.status == val;
          });
          vm.dataChange(vm.data);
          break;
        case 2: //时间选择
          vm.data = vm.data.filter(function(item) {
            return (
              vm.toTime(item.time) > vm.toTime(val[0]) &&
              vm.toTime(item.time) < vm.toTime(val[1])
            );
          });
          vm.dataChange(vm.data);
          break;
      }
    },
    //订单状态选择
    selectChange(value) {
      this.timeValue = "";
      this.inputFilter = "";
      this.filterData(1, value);
    },
    // 订单状态清空
    selectClear() {
      this.getDatas();
    },
    timeSelected(value) {
      this.selectValue = "";
      this.inputFilter = "";
      this.filterData(2, value);
    },
    // 日期转时间戳
    toTime(value) {
      return new Date(value).getTime();
    }
  },
  created() {
    this.id = Number(JSON.parse(sessionStorage.getItem("obj")).id);
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
      background-color: #ff670029;
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
      margin-bottom: 10px;
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
        background-color: #ff670029;
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
                  width:30px;
                  margin-left: 15px;
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
          .cancel{
            width:100%;
          }
        }
      }
    }
    .page {
      text-align: right;
      margin: 20px 0;
    }
  }
}

.btn {
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  outline: 0;
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
.cancel{
  text-align:right;
  border: 1px solid rgb(229, 229, 229);
  padding:8px 5px;
  border-top:none;
}
</style>
