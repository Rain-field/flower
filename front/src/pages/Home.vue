<template>
  <div id="home">
    <heads></heads>
    <header-bg></header-bg>
    <Layout>
      <router-view></router-view>
    </Layout>
    <hr>
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
    }
  },
  created() {
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