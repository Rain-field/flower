<template>
  <div class="contain">
    <routerLink class="logo" tag="div" :to="{name:'Home'}">
      <img src="../assets/logo.png" alt="有花商城" title="有花商城">
    </routerLink>
    <div class="register">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <div class="toHome">
          <Icon type="ios-home" color="#ff6700" size="20"/>
          <router-link :to="{name:'Home'}" tag="span">首页</router-link>
        </div>
        <h1>欢迎注册</h1>
        <FormItem prop="userName">
          <Input type="text" v-model="formInline.userName" placeholder="请输入账号"></Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem prop="passwdCheck">
          <Input type="password" v-model="formInline.passwdCheck" placeholder="请确认密码"></Input>
        </FormItem>
        <FormItem>
          <button @click.prevent="handleSubmit('formInline')">注册</button>
        </FormItem>
        <div class="toLogin">
          已有账号？点击
          <router-link :to="{name:'Login'}" tag="span">登录</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { hex_hmac_md5, str_md5 } from "../assets/md5.js";
export default {
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入你的密码"));
      } else if (value !== this.formInline.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    const validateNameCheck = (rule, value, callback) => {
      this.$axios.get(this.baseURL + "/users").then(res => {
        // console.log(res.data);
        let reg = res.data.filter(function(item, index) {
          //  return item.userName.match(value) ;
          return item.userName == value;
        });
        if (reg.length) {
          callback(new Error("用户名已存在"));
        } else {
          callback();
        }
      });
    };
    return {
      formInline: {
        userName: "",
        password: "",
        passwdCheck: ""
      },
      ruleInline: {
        userName: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          },
          { validator: validateNameCheck, trigger: "blur" }
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
        ],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 日期格式化
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let M = date.getMinutes();
      M = M < 10 ? "0" + M : M;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + m + "-" + d + " " + h + ":" + M + ":" + s;
    },
    handleSubmit(name) {
      let vm = this;
      vm.$refs[name].validate(valid => {
        if (valid) {
          delete vm.formInline.passwdCheck;
          let a = new Date();
          let str = hex_hmac_md5(
            vm.formInline.userName,
            vm.formInline.password
          ); //签名字符串
          let nickName = +new Date();
          nickName = "hua" + String(nickName).substr(6);
          let obj = {
            userName: vm.formInline.userName,
            password: str_md5(vm.formInline.password),
            nickName: nickName,
            str: str,
            isVip: 0,
            sex: "保密",
            birthday: "",
            tel:"",
            email:"",
            time: vm.formatDate(a) //注册时间
          };
          vm.$axios
            .post(vm.baseURL + "/users", obj)
            .then(res => {
              vm.$Message.success("注册成功!");
              // vm.$router.push({name:"Login"})
              vm.formInline = {};
            })
            .then(res => {
              vm.$axios
                .get(vm.baseURL + "/users?userName=" + obj.userName)
                .then(res => {
                  console.log(res);
                  let pas = {
                    id: res.data[0].id,
                    str: res.data[0].str,
                    isVip: res.data[0].isVip
                  };
                  sessionStorage.setItem("obj", JSON.stringify(pas));
                  sessionStorage.setItem("nickName", res.data[0].nickName);
                  sessionStorage.setItem("isVip", res.data[0].isVip);
                  sessionStorage.setItem("name", res.data[0].userName);
                  vm.$router.push({
                    name: "Pages"
                  });
                });
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
.ivu-input {
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
  .register {
    width: 400px;
    height: 480px;
    position: absolute;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    right: 7%;
    top: 50%;
    transform: translate(0, -50%);
    .toHome {
      top: 0;
      font-size: 18px;
      line-height: 1.8;
      span {
        vertical-align: middle;
      }
    }
    h1 {
      border-top: 1px solid #ff6700;
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
      font-size: 18px;
      border: none;
      border-radius: 4px;
      color: white;
      background-color: #ff6700;
      padding: 8px 0;
      outline: none;
    }
    .toLogin {
      font-size: 14px;
      bottom: 0;
      line-height: 40px;
      text-align: right;
    }
    .toLogin,
    .toHome {
      position: absolute;
      width: 80%;
      height: 40px;
      left: 10%;
      span {
        color: #ff6700;
        cursor: pointer;
      }
    }
  }
}
</style>
