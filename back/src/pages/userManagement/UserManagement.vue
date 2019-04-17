<template>
  <Card style="padding:40px">
    <div class="filter">
      <Input
        icon="md-search"
        placeholder="商品名称/订单号/收货人"
        style="width: auto"
        v-model="inputFilter"
        @on-enter="filterData(0)"
        @on-click="filterData(0)"
      />
      <Select
        style="marginLeft:20px; width:187px"
        clearable
        v-model="selectValue"
        @on-change="selectChange"
        @on-clear="selectClear"
      >
        <Option value="0">非会员</Option>
        <Option value="1">会员</Option>
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
  </Card>
</template>

<script>
export default {
  data() {
    return {
      inputFilter: "", //输入筛选
      selectValue: "", //状态值
      loading: true,
      columns: [
        {
          title: "用户名",
          align: "center",
          key: "userName"
        },
        {
          title: "昵称",
          align: "center",
          key: "nickName"
        },
        {
          title: "性别",
          align: "center",
          key: "sex"
        },
        {
          title: "生日",
          align: "center",
          key: "birthday"
        },
        {
          title: "电话",
          align: "center",
          key: "tel"
        },
        {
          title: "邮箱",
          align: "center",
          key: "email"
        },
        {
          title: "是否会员",
          key: "isVip",
          align: "center",
          render: (h, params) => {
            if (params.row.isVip) {
              return h("div", "是");
            } else {
              return h("div", "否");
            }
          }
        }
      ],
      orignData: [], //原始数据，主要用于筛选初始化后恢复原来的数据
      data: [], //原始数据
      pageSize: [5, 10, 15, 20], //自定义每页条数
      total: 0, //分页总数
      limit: 5 //每页条数
    };
  },
  methods: {
    getDatas() {
      // 初始化筛选数据
      //   this.selectValue = "";
      //   this.inputFilter = "";
      //   this.timeValue = "";
      this.$axios
        .get(this.baseURL + "/users")
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
          //如果输入值为空则保持为原数据
          if (value == "") {
            vm.dataChange(vm.orignData);
          } else {
            vm.data = vm.data.filter(function(item, index) {
              return item.userName.match(value) || item.tel.match(value);
            });
            vm.dataChange(vm.data);
          }
          break;
        case 1: //状态选择
          vm.data = vm.data.filter(function(item) {
            return item.isVip == val;
          });
          vm.dataChange(vm.data);
          break;
      }
    },
    //订单状态选择
    selectChange(value) {
      this.inputFilter = "";
      this.filterData(1, value);
    },
    // 订单状态清空
    selectClear() {
      this.getDatas();
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
</style>


