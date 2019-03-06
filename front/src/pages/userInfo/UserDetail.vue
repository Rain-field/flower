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
        <DatePicker type="date" placeholder="选择生日" v-model="formItem.birthday"></DatePicker>
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
        sex:"",
        birthday:"2019-7-01",
        lastLoginTime:"",

      }
    };
  },methods: {
    // 日期处理
    birthDeal(){
      let date = new Date(this.formItem.birthday);
      this.formItem.birthday = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    },
    handleSubmit() {
      this.birthDeal();
      console.log(this.formItem);
    }
  },
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
// .btn{
//     cursor: pointer;
//     border: 1px solid transparent;
//     white-space: nowrap;
//     line-height: 1.5;
//     -webkit-user-select: none;
//     -moz-user-select: none;
//     -ms-user-select: none;
//     user-select: none;
//     padding: 5px 15px 6px;
//     font-size: 12px;
//     border-radius: 4px;
//     transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
//     color: #fff;
//     background-color: #ff6700;
//     border-color: #ff6700
// }
// .btn:hover{
//     background-color: #fa9d5f;
//     border-color: #fa9d5f;
// }
</style>
