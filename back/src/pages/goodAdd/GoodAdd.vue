<template>
  <div class="goodAdd">
    <Form
      ref="formValidate"
      :model="formItem"
      :rules="ruleValidate"
      label-position="left"
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
      <FormItem label="商品种类：" prop="type">
        <Select v-model="formItem.type" placeholder="请选择商品种类" style="width:400px" @on-change="toNumber">
          <Option value="1">鲜花</Option>
          <Option value="2">蛋糕</Option>
          <Option value="3">绿植</Option>
          <Option value="4">礼品</Option>
        </Select>
      </FormItem>
      <FormItem label="商品库存：" prop="inventory">
        <InputNumber :min="1" v-model="formItem.inventory"></InputNumber>
      </FormItem>
      <FormItem>
        <Button type="primary" @click.prevent="handleSubmit('formValidate')">添加商品</Button>
        <Button @click.prevent="handleReset('formValidate')" style="margin-left: 30px">清空</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItem: {
        name: "",
        price: "",
        vipPrice: "",
        info: "",
        type: "",
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
      obj:{
          num:'',
          date:'',
          online:1,
          haveSaled:0,
          url:""
      }
    };
  },
  methods: {
    handleSubmit(name) {
      let vm = this;
      vm.$refs[name].validate(valid => {
        vm.toImg(vm.formItem.type);
        vm.obj.date = vm.formatDate(new Date());
        if(vm.formItem.vipPrice == ""){
          vm.formItem.vipPrice = vm.formItem.price;
        }
        let newObj = Object.assign({},vm.obj,vm.formItem);
        if (valid) {
          vm.$axios.post(vm.baseURL + "/goods", newObj).then(res => {
            vm.$Message.success("商品添加成功!");
            this.handleReset("formValidate");
          });
        }
      });
    },
    // 日期格式化
      formatDate (date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h
        let M = date.getMinutes();
        M = M < 10 ? ('0' + M) : M
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s
        return y + '-' + m + '-' + d + ' '+ h +':' + M + ':' + s;
    },
    // 生成商品编号
    toNumber(type) {
      this.$axios.get(this.baseURL + "/goods?type="+type).then(res => {
            if(!res.data.length){
                this.obj.num = String(type+"000001");
            }else{
                this.obj.num = String((Number(res.data[res.data.length-1].num)+1));
            }
          });
    },
    // 生成随机图片
    toImg(type){
      let a = Math.ceil(Math.random()*20);
      if(a>9){
        this.obj.url = "assets/"+this.typeJudge(type)+"/0"+a+".jpg";
      }else{
        this.obj.url = "assets/"+this.typeJudge(type)+"/00"+a+".jpg";
      }
    },
    // 类型判断
    typeJudge(type){
      switch(type){
        case '1':
          return 'flower';
        break;
        case '2':
          return 'cake';
        break;
        case '3':
          return 'green';
        break;
        case '4':
          return 'gift';
        break;
      }
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  created() {
  },
};
</script>

<style lang="less" scoped>
.goodAdd {
  
}
</style>


