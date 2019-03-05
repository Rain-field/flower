<template>
  <Layout :style="{paddingTop:'20px'}">
    <Content :style="{padding: '24px 20px', minHeight: '380px', background: '#fff'}" id="goodsDetail">
      <div class="imgShow"><img src="../../assets/flower/001.jpg" alt=""></div>
      <div class="contentShow">
          <div></div>
      </div>
    </Content>
  </Layout>
</template>

<script>
export default {
  name: "GoodsDetail"
};
</script>

<style lang="less" scoped>
#goodsDetail {
  width: 1240px;
  margin: auto;
  display: flex;
  .imgShow{
      width: 35%;
      margin: 20px;
      padding: 20px;
      border: 1px solid rgb(226, 226, 226);
      img{
          width: 100%;
          height: 100%;
      }
  }
  .contentShow{
      width: 65%;
      margin: 20px;
      padding: 20px;
  }
}
</style>
