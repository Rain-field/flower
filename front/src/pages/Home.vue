<template>
  <div id="Home">
    <header-bg></header-bg>
    <naver></naver>
    <lun-bo></lun-bo>
  </div>
</template>

<script>
import HeaderBg from "../components/HeaderBg";
import Naver from "../components/Naver";
import LunBo from '../components/Carousel';

export default {
  name: "Home",
  components: {
    HeaderBg,
    Naver,
    LunBo
  }
};
</script>

<style>
</style>