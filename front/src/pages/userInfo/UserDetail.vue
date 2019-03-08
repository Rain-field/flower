<template>
  <div id="userDetail">
    <Form :model="formItem" label-position="left" :label-width="100">
      <FormItem label="用户名：">
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
        <DatePicker type="date" placeholder="选择生日" @on-change="getBirthday"></DatePicker>
      </FormItem>
      <FormItem label="上次登录时间：">
        <p>{{formItem.lastLoginTime}}</p>
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
      formItem: {
        userName: "",
        nickName: "",
        sex: "",
        birthday: "2019-7-01",
        lastLoginTime: ""
      }
    };
  },
  methods: {
    getBirthday(value) {
      this.formItem.birthday = value;
    },
    handleSubmit() {
      console.log(this.formItem);
    }
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

 <style lang="less" scoped>
</style>
