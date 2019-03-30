<template>
  <div>
    <Table border :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "订单编号",
          key: "num"
        },
        {
          title: "商品名称",
          key: "data",
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
          title: "收货人",
          key: "address",
          render: (h, params) => {
            return h("span", params.row.address.name);
          }
        },
        {
          title: "订单时间",
          key: "time"
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
      data: []
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
    remove(index) {
      this.data.splice(index, 1);
    },
    getDatas() {
      this.$axios.get(this.baseURL + "/orders").then(res => {
        console.log(res.data);
        this.data = res.data.reverse();
      });
    }
  },
  created() {
    this.getDatas();
  }
};
</script>

<style lang="less" scoped>
</style>


