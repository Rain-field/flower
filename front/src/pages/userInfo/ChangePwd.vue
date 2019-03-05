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
        newPwdCheck: [{required:true, validator: validatePassCheck, trigger: "blur" }]
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

<style lang="less" scoped>
.btn {
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  user-select: none;
  padding: 5px 15px 6px;
  font-size: 12px;
  border-radius: 4px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear, box-shadow 0.2s linear;
  color: #fff;
  background-color: #ff6700;
  border-color: #ff6700;
}
.btn:hover {
  background-color: #fa9d5f;
  border-color: #fa9d5f;
}
</style>
