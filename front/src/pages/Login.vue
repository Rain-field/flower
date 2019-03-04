<template>
  <div class="contain">
    <routerLink class="logo" tag="div" :to="{name:'Home'}">
      <img src="../assets/logo.png" alt="有花商城" title="有花商城">
    </routerLink>
    <div class="login">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <h1>欢迎登录</h1>
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="账号">
            <Icon type="ios-person-outline" slot="prepend" size="20"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="ios-lock-outline" slot="prepend" size="20"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <button @click.prevent="handleSubmit('formInline')">登录</button>
        </FormItem>
        <div class="toRegister">没有账号？点击
          <router-link :to="{name:'Register'}" tag="span">注册</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码不能低于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style lang="">
html,
body {
  width: 100%;
  height: 100%;
  font-family: pictos, "微软雅黑";
}
.ivu-form-item-content {
  width: 80%;
  margin-left: 10%;
}
.ivu-input-group .ivu-input {
  height: 40px;
}
</style>

<style lang="less" scoped>
.contain {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .logo {
    padding: 40px;
    cursor: pointer;
  }
  .login {
    width: 400px;
    height: 500px;
    position: absolute;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    right: 7%;
    top: 50%;
    transform: translate(0, -50%);
    h1 {
      font-size: 48px;
      color: #ff6700;
      letter-spacing: 2px;
      padding: 2px 0 10px 0;
      font-weight: bold;
      text-align: center;
      padding-bottom: 40px;
      margin: 30px 0;
    }
    button {
      margin: 20px 0;
      cursor: pointer;
      width: 100%;
      text-align: center;
      border: none;
      border-radius: 4px;
      color: white;
      background-color: #ff6700;
      font-size: 18px;
      outline: none;
      padding: 8px 0;
    }
    .toRegister {
      position: absolute;
      bottom: 0;
      width: 80%;
      left: 10%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: right;
      span{
          color: #ff6700;
          cursor: pointer;
      }
    }
  }
}
</style>
