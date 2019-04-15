<template>
  <div>
    <div class="filter">
      <Input
        icon="md-search"
        placeholder="商品编号/商品名称"
        style="width: auto"
        v-model="inputFilter"
        @on-enter="filterData(0)"
        @on-click="filterData(0)"
      />
      <Select
        style="marginLeft:20px; width:187px"
        clearable
        placeholder="商品类型"
        v-model="selectValue"
        @on-change="selectChange"
        @on-clear="selectClear"
      >
        <Option value="1">鲜花</Option>
        <Option value="2">蛋糕</Option>
        <Option value="3">绿植</Option>
        <Option value="4">礼品</Option>
      </Select>
      <Select
        style="marginLeft:20px; width:187px"
        clearable
        placeholder="商品在线状态"
        v-model="selectValue2"
        @on-change="selectChange2"
        @on-clear="selectClear"
      >
        <Option value="0">未上线</Option>
        <Option value="1">已上线</Option>
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
      :page-size-opts="pageSize"
      @on-change="changPage"
      @on-page-size-change="changePageSize"
    />
    <Modal footer-hide :width="600" v-model="modalOpreation">
      <p slot="header" style="text-align:center">
        <span>商品信息修改</span>
      </p>
      <Form
        ref="formValidate"
        :model="formItem"
        :rules="ruleValidate"
        label-position="right"
        :label-width="100"
      >
        <FormItem label="商品名称：" prop="name">
          <Input v-model="formItem.name" style="width:400px" placeholder="请输入商品名称"></Input>
        </FormItem>
        <FormItem label="商品原价：" prop="price">
          <Input v-model="formItem.price" style="width:400px" placeholder="请输入商品价格"></Input>
        </FormItem>
        <FormItem label="商品VIP价：" prop="vipPrice">
          <Input v-model="formItem.vipPrice" style="width:400px" placeholder="请输入商品VIP价，不输入则默认原价"></Input>
        </FormItem>
        <FormItem label="商品介绍：" prop="info">
          <Input
            v-model="formItem.info"
            type="textarea"
            style="width:400px"
            placeholder="请输入商品的介绍"
            :rows="4"
          ></Input>
        </FormItem>
        <FormItem label="商品库存：" prop="inventory">
          <InputNumber :min="1" v-model="formItem.inventory"></InputNumber>
        </FormItem>
        <FormItem>
          <Button type="primary" @click.prevent="editConfirm('formValidate')">确认修改</Button>
          <Button style="margin-left: 20px" @click="editCancel()">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputFilter: "",
      selectValue: "",
      selectValue2: "",
      loading: true,
      modalOpreation: false,
      columns: [
        {
          title: "商品编号",
          align: "center",
          key: "num"
        },
        {
          title: "商品名称",
          key: "name",
          align: "center"
        },
        {
          title: "商品分类",
          align: "center",
          key: "type",
          render: (h, params) => {
            switch (params.row.type) {
              case "1":
                return h("div", "鲜花");
                break;
              case "2":
                return h("div", "蛋糕");
                break;
              case "3":
                return h("div", "绿植");
                break;
              case "4":
                return h("div", "礼品");
                break;
            }
          }
        },
        {
          title: "商品介绍",
          align: "center",
          key: "info",
          tooltip: true
        },
        {
          title: "销量",
          align: "center",
          key: "haveSaled",
          sortable: "true"
        },
        {
          title: "库存",
          align: "center",
          key: "inventory",
          sortable: "true",
          render: (h, params) => {
            if (params.row.inventory <= 5) {
              return h(
                "div",
                {
                  style: {
                    color: "red",
                    fontWeight: "bold"
                  }
                },
                params.row.inventory
              );
            } else {
              return h("div", params.row.inventory);
            }
          }
        },
        {
          title: "原价",
          key: "price",
          align: "center",
          render: (h, params) => {
            return h("div", "￥" + params.row.price);
          }
        },
        {
          title: "VIP价",
          key: "vipPrice",
          align: "center",
          render: (h, params) => {
            return h("div", "￥" + params.row.vipPrice);
          }
        },
        {
          title: "操作",
          key: "action",
          width: "174",
          align: "center",
          render: (h, params) => {
            let children = [];
            if (params.row.online == 1) {
              let downline = {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.publish(params.row.id, 0);
                  }
                }
              };
              children.push(h("Button", downline, "下线"));
              return h("div", children);
            } else {
              let publish = {
                props: {
                  type: "success",
                  size: "small"
                },
                style: {
                  marginRight: "5px",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.publish(params.row.id, 1);
                  }
                }
              };
              let edit = {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.edit(params.row.id);
                  }
                }
              };
              let del = {
                props: {
                  type: "error",
                  size: "small"
                },
                style: {
                  marginRight: "5px",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.del(params.row.id);
                  }
                }
              };
              children.push(h("Button", publish, "发布"));
              children.push(h("Button", edit, "编辑"));
              children.push(h("Button", del, "删除"));
              return h("div", children);
            }
          }
        }
      ],
      formItem: {
        name: "",
        price: "",
        vipPrice: "",
        info: "",
        inventory: null
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "收货人姓名不能为空",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "商品价格不能为空",
            trigger: "blur"
          },
          {
            type: "number",
            message: "商品价格只能为最多两位小数的数字",
            trigger: "blur",
            transform(value) {
              var myreg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/;
              if (!myreg.test(value)) {
                return false;
              } else {
                return Number(value);
              }
            }
          }
        ],
        type: [
          {
            required: true,
            message: "请选择商品的类型",
            trigger: "change"
          }
        ],
        inventory: [
          {
            required: true,
            message: "库存量不能为空"
          }
        ]
      },
      orignData: [], //原始数据，主要用于筛选初始化后恢复原来的数据
      data: [], //原始数据
      total: 0, //分页总数
      limit: 5, //每页条数
      pageSize: [5, 10, 15, 20] //自定义每页条数
    };
  },
  methods: {
    getDatas() {
      // 初始化筛选数据
      this.$axios
        .get(this.baseURL + "/goods")
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
        type //type0表示搜索，type1表示商品类型查询，type2表示商品上下线查询
      ) {
        case 0:
          this.selectValue = "";
          this.selectValue2 = "";
          //如果输入值为空则保持为原数据
          if (value == "") {
            vm.dataChange(vm.orignData);
          } else {
            vm.data = vm.data.filter(function(item, index) {
                return item.num.match(value) || item.name.match(value);
            });
            vm.dataChange(vm.data);
          }
          break;
        case 1: //状态选择
          vm.data = vm.data.filter(function(item) {
            return item.type == val;
          });
          vm.dataChange(vm.data);
          break;
        case 2: //时间选择
          vm.data = vm.data.filter(function(item) {
            return item.online == val
          });
          vm.dataChange(vm.data);
          break;
      }
    },
    //商品状态选择
    selectChange(value) {
      this.inputFilter = "";
      this.selectValue2 = "";
      this.filterData(1, value);
    },
    //商品状态选择
    selectChange2(value) {
      this.inputFilter = "";
      this.selectValue = "";
      this.filterData(2, value);
    },
    // 商品状态清空
    selectClear() {
      this.getDatas();
    },
    //发布或下线操作
    publish(id, status) {
      let vm = this;
      if (status == 1) {
        vm.$Modal.confirm({
          title: "商品发布",
          content: "是否发布该商品？",
          onOk: function() {
            vm.$axios
              .patch(this.baseURL + "/goods/" + id, { online: 1 })
              .then(res => {
                vm.$Message.success("商品发布成功");
                vm.getDatas();
              });
          }
        });
      } else {
        vm.$Modal.confirm({
          title: "商品下线",
          content: "是否下线该商品？",
          onOk: function() {
            vm.$axios
              .patch(this.baseURL + "/goods/" + id, { online: 0 })
              .then(res => {
                vm.$Message.success("商品下线成功");
                vm.getDatas();
              });
          }
        });
      }
    },
    // 编辑操作
    edit(id) {
      this.$axios.get(this.baseURL + "/goods/" + id).then(res => {
        this.formItem = res.data;
        this.modalOpreation = !this.modalOpreation;
        console.log(this.formItem);
      });
    },
    editConfirm(name) {
      let vm = this;
      vm.$refs[name].validate(valid => {
        if (valid) {
          vm.$axios
            .patch(vm.baseURL + "/goods/" + vm.formItem.id, vm.formItem)
            .then(res => {
              vm.$Message.success("商品修改成功!");
              this.modalOpreation = !this.modalOpreation;
              this.getDatas();
            });
        }
      });
    },
    editCancel() {
      this.modalOpreation = !this.modalOpreation;
    },
    // 删除订单
    del(id) {
      let vm = this;
      vm.$Modal.confirm({
        title: "提示",
        content: "确认要删除吗？",
        onOk: () => {
          this.$axios
            .delete(this.baseURL + "/goods/" + id)
            .then(res => {
              vm.$Message.info("删除成功");
              vm.getDatas();
            });
        }
      });
    },
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
</style>


