<template>
  <div id="userDetail">
    <Form :model="formItem" label-position="left" :label-width="100">
      <FormItem label="账号：">
        <p>{{formItem.userName}}</p>
      </FormItem>
      <FormItem label="昵称：">
        <Input v-model="formItem.nickName" style="width:190px"></Input>
      </FormItem>
      <FormItem label="性别：">
        <RadioGroup v-model="formItem.sex">
          <Radio label="男"></Radio>
          <Radio label="女"></Radio>
          <Radio label="保密"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="生日：">
        <DatePicker
          type="date"
          v-model="formItem.birthday"
          placeholder="选择生日"
          @on-change="getBirthday"
          transfer
        ></DatePicker>
      </FormItem>
       <FormItem label="手机号：">
        <Input v-model="formItem.tel" style="width:190px"></Input>
      </FormItem>
       <FormItem label="邮箱：">
        <Input v-model="formItem.email" style="width:190px"></Input>
      </FormItem>
      <FormItem>
        <button class="btn" @click.prevent="handleSubmit">提交</button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      formItem: {
        userName: "",
        nickName: "",
        sex: "",
        birthday: "",
        tel:"",
        email:""
      }
    };
  },
  methods: {
    getBirthday(value) {
      this.formItem.birthday = value;
    },
    handleSubmit() {
      this.$axios.patch(this.baseURL+"/users/" + this.id, this.formItem).then(res => {
        sessionStorage.setItem("nickName",this.formItem.nickName);
        this.$Message.success("修改成功");
      });
    },
    getDatas() {
      this.$axios.get(this.baseURL+"/users/" + this.id).then(res => {
        this.formItem = res.data;
      });
    }
  },
  created() {
    this.id = JSON.parse(sessionStorage.getItem("obj")).id;
    this.getDatas();
  }
};
</script>
<style lang="">
.ivu-radio-checked .ivu-radio-inner {
  border-color: #ff6700;
}
.ivu-radio-checked:hover .ivu-radio-inner {
  border-color: #ff6700;
}
.ivu-radio-inner:after {
  background-color: #ff6700;
}
</style>

