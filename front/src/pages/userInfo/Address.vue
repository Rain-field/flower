<template>
  <div id="address">
    <Form
      ref="formValidate"
      :model="formItem"
      :rules="ruleValidate"
      label-position="left"
      :label-width="100"
    >
      <FormItem label="收货人：" prop="name">
        <Input v-model="formItem.name" style="width:190px"></Input>
      </FormItem>
      <FormItem label="电话：" prop="tel">
        <Input v-model="formItem.tel" style="width:190px"></Input>
      </FormItem>
      <FormItem label="所在区域：" prop="area">
        <Cascader :data="data" v-model="formItem.area" style="width:190px"></Cascader>
      </FormItem>
      <FormItem label="详细地址：" prop="address">
        <Input v-model="formItem.address" style="width:190px"></Input>
      </FormItem>
      <FormItem>
        <button class="btn" @click.prevent="handleSubmit('formValidate')">添加</button>
        <Button @click.prevent="handleReset('formValidate')" style="margin-left: 15px">清空</Button>
      </FormItem>
    </Form>
    <div class="title">管理地址：</div>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItem: {
        name: "",
        tel: "",
        area: [],
        address: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "收货人姓名不能为空",
            trigger: "blur"
          }
        ],
        tel: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          {
            type: "number",
            message: "请填写正确的电话",
            trigger: "blur",
            transform(value) {
              var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
              if (!myreg.test(value)) {
                return false;
              } else {
                return Number(value);
              }
            }
          }
        ],
        area: [
          {
            required: true,
            message: "区域不能为空"
          }
        ],
        address: [
          {
            type: "string",
            required: true,
            min: 3,
            message: "至少3个字符",
            trigger: "blur"
          }
        ]
      },
      columns1: [
        {
          title: "收货人",
          key: "name"
        },
        {
          title: "电话",
          key: "tel"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "操作",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "button",
                {
                  attrs: {
                    class: "btn"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [],
      //级联地址数据
      data: []
    };
  },
  methods: {
    remove(index) {
      this.$axios.delete("http://localhost:3000/address/" + index).then(res => {
        this.getData();
        this.$Message.success("删除成功!");
      });
    },
    handleSubmit(name) {
      let newData = { name: "", tel: "", address: "" };
      newData.address =
        this.formItem.area[0] + this.formItem.area[1] + this.formItem.address; //发送数据处理
      newData.name = this.formItem.name;
      newData.tel = this.formItem.tel;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios
            .post("http://localhost:3000/address", newData)
            .then(res => {
              this.formItem = {};
              this.getData();
              this.$Message.success("添加成功!");
            });
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getData() {
      // 获取表格地址数据
      this.$axios.get("http://localhost:3000/address").then(res => {
        this.data1 = res.data;
      });
    }
  },
  created() {
    //获取级联数据
    this.$axios.get("http://localhost:3000/cast").then(res => {
      this.data = res.data;
    });
    this.getData();
  }
};
</script>
<style lang="">
</style>

 <style lang="less" scoped>
#address {
  .title {
    margin: 20px 0;
  }
}
</style>
