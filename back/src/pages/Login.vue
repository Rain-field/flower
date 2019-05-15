<template>
  <div class="contain">
    <div class="logo">
      <img src="../assets/logo.png" alt="有花商城" title="有花商城">
    </div>
    <div class="login">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <h1>欢迎登录</h1>
        <FormItem prop="userName">
          <Input type="text" v-model="formInline.userName" placeholder="账号">
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
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        userName: "",
        password: ""
      },
      ruleInline: {
        userName: [
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
      let vm = this;
      vm.$refs[name].validate(valid => {
        if (valid) {
          vm.$axios.get(this.baseURL+"/administrator").then(res => {
            let reg = res.data.filter(function(item, index) {
              return item.userName == vm.formInline.userName;
            });
            if (reg.length) {
              if (reg[0].password === vm.formInline.password) {
                vm.$Message.success("登录成功");
                sessionStorage.setItem("str", reg[0].str);
                vm.$router.push({
                  name: "Home",
                });
              } else {
                this.$Message.error("账号或密码错误!");
              }
            } else {
              this.$Message.error("账号或密码错误!");
            }
          });
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
    width: 180px;
    padding: 40px;
    cursor: pointer;
  }
  .login {
    width: 400px;
    height: 480px;
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
      padding-top: 20px;
      margin: 40px 0 30px;
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
  }
}
</style>
