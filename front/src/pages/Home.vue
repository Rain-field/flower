<template>
  <div id="Home">
    <header-bg></header-bg>
    <naver></naver>
    <lun-bo></lun-bo>
    <categories></categories>
  </div>
</template>

<script>
import HeaderBg from "../components/HeaderBg";
import Naver from "../components/Naver";
import LunBo from '../components/Carousel';
import Categories from '../components/Categories';

export default {
  name: "Home",
  components: {
    HeaderBg,
    Naver,
    LunBo,
    Categories
  }
};
</script>

<style>
</style>