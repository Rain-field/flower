<template>
  <div id="userDetail">
    <Form :model="formItem" label-position="left" :label-width="100">
      <FormItem label="用户名">
        <p>{{formItem.userName}}</p>
      </FormItem>
      <FormItem label="昵称">
        <Input v-model="formItem.nickName"></Input>
      </FormItem>
      <FormItem label="性别">
        <RadioGroup v-model="formItem.sex">
          <Radio label="男"></Radio>
          <Radio label="女"></Radio>
          <Radio label="保密"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="生日">
        <DatePicker type="date" placeholder="Select date" v-model="formItem.birthday"></DatePicker>
      </FormItem>
      <FormItem label="上次登录时间">
        <Input v-model="formItem.lastLoginTime"></Input>
      </FormItem>
      <FormItem>
          <button class="btn" @click.prevent="">提交</button>
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
        sex:"",
        birthday:"",
        lastLoginTime:"",

      }
    };
  }
};
</script>
<style lang="">
.ivu-radio-checked .ivu-radio-inner{
    border-color: #ff6700;
}
.ivu-radio-checked:hover .ivu-radio-inner{
    border-color: #ff6700;
}
.ivu-radio-inner:after{
    background-color: #ff6700;
}
</style>

<style lang="less" scoped>
.btn{
    background-color: #ff6700;
    border: none;
    padding: 2px 15px;
    border-radius: 5px;
    letter-spacing: 2px;
    color: white;
    cursor: pointer;
    outline: none;
}
</style>
