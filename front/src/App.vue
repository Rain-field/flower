<template>
  <div id="app">
    <div class="contain">
      <heads></heads>

      <router-view/>
    </div>
  </div>
</template>

<script>
import Heads from "./components/Header";

export default {
  name: "App",
  components: {
    Heads
  }
};
</script>

<style>
body * {
  list-style: none;
}
.contain {
  font-size: 14px;
  min-width: 1240px;
}
</style>
