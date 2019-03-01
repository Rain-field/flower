<template>
  <div id="app">
    <div class="contain">
      <heads></heads>
      <header-bg></header-bg>
      <naver></naver>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Heads from "./components/Header";
import HeaderBg from "./components/HeaderBg";
import Naver from "./components/Naver";

export default {
  name: "App",
  components: {
    Heads,
    HeaderBg,
    Naver
  }
};
</script>

<style>
body *{
    list-style: none;
}
.contain {
  font-size: 14px;
  min-width: 1240px;
}
</style>
