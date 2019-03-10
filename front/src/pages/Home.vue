<template>
  <div id="home">
    <heads :lists="lists"></heads>
    <header-bg></header-bg>
    <Layout :style="{paddingTop:'20px'}">
      <router-view></router-view>
    </Layout>
    <foots></foots>
  </div>
</template>

<script>
import Heads from "../components/Header";
import HeaderBg from "../components/HeaderBg";
import foots from "../components/Footer";

export default {
  name: "Home",
  components: {
    Heads,
    HeaderBg,
    foots
  },
  data() {
    return {
      lists:{}
    }
  },
  created() {
    this.lists = this.$route.params;
  }
};
</script>

<style>
body * {
  list-style: none;
}
#home {
  font-size: 14px;
  min-width: 1240px;
}
</style>