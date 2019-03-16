<template>
  <div id="joinVip">
    <h2>加入会员</h2>
    <p>1.成为会员的条件是什么？</p>
    <pre>答：只要在本商城下单金额大于99元且无退款情况均可申请成为会员</pre>
    <p>2.成为会员有什么好处?</p>
    <pre>答：成为本商城会员可以享受商品的会员价，让您购物更加实惠</pre>
    <div class="empty"></div>
  </div>
</template>

<script>
export default {
  name: "JoinVip"
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
}
</style>
