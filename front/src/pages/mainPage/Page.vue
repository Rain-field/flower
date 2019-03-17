<template>
  <div id="page">
      <naver></naver>
      <lun-bo></lun-bo>
      <categories title="鲜花" goodId ="1"></categories>
      <categories title="蛋糕" goodId ="2"></categories>
      <categories title="绿植" goodId ="3"></categories>
      <categories title="礼品" goodId ="4"></categories>
    </div>
</template>

<script>
import Naver from "../../components/Naver";
import LunBo from "../../components/Carousel";
import Categories from "../../components/Categories";

export default {
  name: "Page",
  components: {
    LunBo,
    Categories,
    Naver
  }
};
</script>

<style>

</style>