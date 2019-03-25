<template>
  <div id="changePwd">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="120">
      <FormItem prop="pwd" label="初始密码:">
        <Input type="password" v-model="formInline.pwd" style="width:350px" placeholder="请输入初始密码"></Input>
      </FormItem>
      <FormItem prop="newPwd" label="修改密码:">
        <Input
          type="password"
          v-model="formInline.newPwd"
          style="width:350px"
          placeholder="请输入修改后的密码"
        ></Input>
      </FormItem>
      <FormItem prop="newPwdCheck" label="确认修改密码:">
        <Input
          type="password"
          v-model="formInline.newPwdCheck"
          style="width:350px"
          placeholder="请再次输入修改后的密码"
        ></Input>
      </FormItem>
      <FormItem>
        <button class="btn" @click.prevent="handleSubmit('formInline')">确认修改</button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { str_md5 } from "../../assets/md5.js";
export default {
  name: "ChangePwd",
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认你的密码"));
      } else if (value !== this.formInline.newPwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      id: 0,
      pwd: "", //获取原密码
      formInline: {
        pwd: "",
        newPwd: "",
        newPwdCheck: ""
      },
      ruleInline: {
        pwd: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        newPwd: [
          {
            required: true,
            message: "修改密码不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "修改密码不能低于6位",
            trigger: "blur"
          }
        ],
        newPwdCheck: [
          { required: true, validator: validatePassCheck, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //判断密码正确
          if (str_md5(this.formInline.pwd) === this.pwd) {
            this.$axios.patch(this.baseURL+"/users/" + this.id,{password:str_md5(this.formInline.newPwd)}).then(res => {
              this.formInline = {};
              this.$Message.success("修改成功!");
            });
          } else {
            this.$Message.error("密码错误!");
          }
        }
      });
    },
    getDatas() {
      this.$axios.get(this.baseURL+"/users/" + this.id).then(res => {
        this.pwd = res.data.password;
      });
    }
  },
  created() {
    this.id = JSON.parse(sessionStorage.getItem("obj")).id;
    this.getDatas();
  }
};
</script>

<style lang="less" scoped>
</style>
