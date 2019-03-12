<template>
  <div id="page">
      <naver></naver>
      <lun-bo></lun-bo>
      <categories></categories>
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