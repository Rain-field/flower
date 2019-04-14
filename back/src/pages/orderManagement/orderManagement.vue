<template>
  <div>
    <div class="filter">
       <Input
          icon="md-search"
          placeholder="商品名称/订单号/收货人"
          style="width: auto"
          v-model="inputFilter"
        />
        <DatePicker
          type="daterange"
          placeholder="时间段查询"
          v-model="timeValue"
          style="marginLeft:20px; width: 280px"
          :options="options"

        ></DatePicker>
        <Select
          style="marginLeft:20px; width:187px"
          clearable
          v-model="selectValue"
        >
          <Option value="0">待处理</Option>
          <Option value="1">已完成</Option>
        </Select>
    </div>
    <Table :loading="loading" :columns="columns" :data="data" no-data-text="无" no-filtered-data-text="暂无搜索数据"></Table>
    <Page
          :total="total"
          :page-size="limit"
          class-name="page"
          show-sizer
          transfer
          @on-change="changPage"
          @on-page-size-change="changePageSize"
        />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputFilter: "", //输入筛选
      timeValue: "", //时间值
      selectValue: "", //状态值
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      }, //日期选择限制
      loading:true,
      columns: [
        {
          title: "订单编号",
          align:"center",
          key: "num",
          sortable:"true"
        },
        {
          title: "商品名称",
          key: "data",
          align:"center",
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
          align:"center",
          key: "userName",
        },
        {
          title: "备注信息",
          align:"center",
          key: "tips",
          tooltip:true
        },
        {
          title: "订单时间",
          align:"center",
          width:"150px",
          key: "time",
          sortable:"true"
        },
        {
          title: "订单状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            if (params.row.status == 2) {
              return h("div", "已完成");
            }else if(params.row.status == 1){
              return h("div", "待确认");
            } else {
              return h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                    ghost:true
                  },
                  on: {
                    click: () => {
                      this.dealOrder(params.row.id);
                    }
                  }
                },
                "待处理"
              )
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
                      this.show(params.index);
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
      limit: 5, //每页条数
    };
  },
  methods: {
    show(index) {
      //   this.$Modal.info({
      //     title: "User Info",
      //     content: `Name：${this.data[index].name}<br>Age：${
      //       this.data[index].age
      //     }<br>Address：${this.data[index].address}`
      //   });
      console.log(index);
    },
    // 处理订单
    dealOrder(orderId){
      console.log(orderId);
      let vm = this;
        vm.$Modal.confirm({
          title: "确认开始处理订单吗",
          content: "接下来开始处理订单物流等信息。。。",
           onOk() {
             vm.$axios.patch(vm.baseURL+"/orders/"+orderId,{status:1}).then(res => {
                vm.$Message.success("订单处理成功");
                vm.getDatas();
             })
          }
        });
    },
    getDatas() {
      this.$axios.get(this.baseURL + "/orders").then(res => {
        console.log(res.data);
        res.data = res.data.reverse();
        this.data = JSON.parse(JSON.stringify(res.data));
        this.orignData = JSON.parse(JSON.stringify(res.data));
        this.dataChange(this.orignData); //必须使用this.data，不能使用res.data，事关深拷贝
      }).then(res2 => {
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
  },
  created() {
    this.getDatas();
  }
};
</script>

<style lang="less" scoped>
.filter{
  margin-bottom: 20px;
}
</style>


