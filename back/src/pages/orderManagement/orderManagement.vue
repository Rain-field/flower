<template>
  <div>
    <div class="filter">
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
        clearable
        v-model="selectValue"
        @on-change="selectChange"
        @on-clear="selectClear"
      >
        <Option value="0">待处理</Option>
        <Option value="1">待确认</Option>
        <Option value="2">已完成</Option>
      </Select>
    </div>
    <Table :loading="loading" :columns="columns" :data="data" no-data-text="暂无搜索数据"></Table>
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
    <Modal v-model="modalShow" title="详情" footer-hide closable>
      <div class="modalContent">
        <div class="modalItem">
          <div>订单编号:{{modalDatas.num}}</div>
          <div>订单时间:{{modalDatas.time}}</div>
        </div>
        <div class="modalListContent">
          <div class="modalList" v-for="(item, index) in modalDatas.data" :key="index">
            <div class="imgWrap"><img src="../../assets/head.jpg" alt=""></div>
            <!-- <div class="imgWrap"><img :src="item.url" alt=""></div> -->
            <div class="modalDetail">
              <div class="modalName">
                <div>{{item.name}}</div>
                <div :class="[modalDatas.status==0?'warning':'']">{{statusChange(modalDatas.status)}}</div>
              </div>
              <div>数量：×{{item.quantity}}</div>
              <div>价格:¥{{item.price}}</div>
            </div>
          </div>
        </div>
        <div class="modalItem">
          <div>总价</div>
          <div class="font">¥{{modalDatas.price}}</div>
        </div>
        <div class="modalItem">
          <div>收货人</div>
          <div>{{modalAddress.name}}</div>
        </div>
        <div class="modalItem">
          <div>联系电话</div>
          <div>{{modalAddress.tel}}</div>
        </div>
        <div class="modalItem">
          <div>联系地址</div>
          <div>{{modalAddress.address}}</div>
        </div>
        <div class="modalItem">
          <div>送货时间</div>
          <div>{{modalDatas.date}}</div>
        </div>
        <div class="modalItem">
          <div>备注</div>
          <div>{{modalDatas.tips}}</div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalShow: false,
      modalDatas:{},
      modalAddress:{},
      inputFilter: "", //输入筛选
      timeValue: "", //时间值
      selectValue: "", //状态值
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      }, //日期选择限制
      loading: true,
      columns: [
        {
          title: "订单编号",
          align: "center",
          key: "num",
          sortable: "true"
        },
        {
          title: "商品名称",
          key: "data",
          align: "center",
          ellipsis: "true",
          render: (h, params) => {
            if (params.row.data.length > 1) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "#ff6700",
                      marginRight: "5px"
                    }
                  },
                  params.row.data[0].name
                ),
                h("span", {}, "等"),
                h(
                  "span",
                  {
                    style: {
                      marginLeft: "5px",
                      color: "#ff6700"
                    }
                  },
                  params.row.data.length
                ),
                h("span", {}, "件商品")
              ]);
            } else {
              return h(
                "span",
                {
                  style: {
                    color: "#ff6700"
                  }
                },
                params.row.data[0].name
              );
            }
            //  return  h("span",params.row.data[0].name+"等"+ params.row.data.length +"件商品");
          }
        },
        {
          title: "用户名",
          align: "center",
          key: "userName"
        },
        {
          title: "备注信息",
          align: "center",
          key: "tips",
          tooltip: true
        },
        {
          title: "订单时间",
          align: "center",
          width: "150px",
          key: "time",
          sortable: "true"
        },
        {
          title: "订单状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            if (params.row.status == 2) {
              return h("div", "已完成");
            } else if (params.row.status == 1) {
              return h("div", "待确认");
            } else {
              return h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                    ghost: true
                  },
                  on: {
                    click: () => {
                      this.dealOrder(params.row.id);
                    }
                  }
                },
                "待处理"
              );
            }
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
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.show(params.row.id);
                    }
                  }
                },
                "查看详情"
              )
            ]);
          }
        }
      ],
      orignData: [], //原始数据，主要用于筛选初始化后恢复原来的数据
      data: [], //原始数据
      total: 0, //分页总数
      limit: 5 //每页条数
    };
  },
  methods: {
    statusChange(id) {
      if(id == 0){
        return '待处理'
      }else if(id == 1){
        return '待确认'
      }else{
        return '已完成'
      }
    },
    show(index) {
      this.modalShow = !this.modalShow;
     this.$axios
        .get(this.baseURL + "/orders/"+index)
        .then(res => {
          console.log(res.data);
          this.modalDatas = res.data;
          this.modalAddress = res.data.address;
        })
    },
    // 处理订单
    dealOrder(orderId) {
      console.log(orderId);
      let vm = this;
      vm.$Modal.confirm({
        title: "确认开始处理订单吗",
        content: "接下来开始处理订单物流等信息。。。",
        onOk() {
          vm.$axios
            .patch(vm.baseURL + "/orders/" + orderId, { status: 1 })
            .then(res => {
              vm.$Message.success("订单处理成功");
              vm.getDatas();
            });
        }
      });
    },
    getDatas() {
      // 初始化筛选数据
      this.selectValue = "";
      this.inputFilter = "";
      this.timeValue = "";
      this.$axios
        .get(this.baseURL + "/orders")
        .then(res => {
          res.data = res.data.reverse();
          this.data = JSON.parse(JSON.stringify(res.data));
          this.orignData = JSON.parse(JSON.stringify(res.data));
          this.dataChange(this.orignData); //必须使用this.data，不能使用res.data，事关深拷贝
        })
        .then(res2 => {
          this.loading = false;
        });
    },
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
                return item.num.match(value) || item.userName.match(value);
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
    this.getDatas();
  }
};
</script>

<style lang="less" scoped>
.filter {
  margin-bottom: 20px;
}
.page {
  text-align: right;
  margin: 20px 0;
}
.warning{
  color:#ffad33 !important;
}
.modalContent{
  .modalItem{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
    
    .font{
      font-size: 20px;
    }
  }
  .modalItem:not(:last-child){
    border-bottom: 1px solid #eee;
  }
}
    .modalListContent{
      padding: 10px 0;
        .modalList{
          display:flex;
          .imgWrap{
            width: 100px;
            height: 100px;
            margin-right: 20px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .modalDetail{
            width: calc(100% - 120px);
            .modalName{
              display: flex;
              justify-content: space-between;
              div:first-child{
                font-weight: bold;
                font-size: 16px;
              }
              div:last-child{
                font-size: 16px;
                color:#2d8cf0;
              }
            }
          }
        }
      }
</style>


