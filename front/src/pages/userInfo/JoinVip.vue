<template>
  <div id="joinVip">
    <h2>加入会员</h2>
    <p>1.成为会员的条件是什么？</p>
    <pre>答：只要在本商城下单消费一笔且无退款情况均可申请成为会员</pre>
    <p>2.成为会员有什么好处?</p>
    <pre>答：成为本商城会员可以享受商品的会员价</pre>
    <div class="empty"></div>
    <button class="btn" @click="beingVip">申请成为会员</button>
  </div>
</template>

<script>
export default {
  name: "JoinVip",
  data() {
      return {
          orders:0,
          isVip:0
      }
  },
  methods: {
      beingVip() {
          if(this.orders == 0 && this.isVip == 0){
              this.$Message.error("您不满足条件!");
          }else if(this.orders == 1 && this.isVip == 0){
            //   成为vip，发送patch请求将isVip改为1
            this.$Message.success("恭喜您成为本商城的会员！");
          }else{
            this.$Message.warning("您已经是商城的会员啦！");
          }
      }
  },
};
</script>

<style lang="less" scoped>
#joinVip {
    position: relative;
  h2 {
    text-align: center;
    color: #ff6700;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  pre {
    text-indent: 28px;
  }
  .empty{
      height: 60px;
  }
  .btn {
      position: absolute;
      bottom: 0;
      right: 0;
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
}
</style>
