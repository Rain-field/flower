<template>
    <div class="contain">
      <h2>hello</h2>
    </div>
</template>

<script>
import Head from './components/Header';
import HeaderBg from './components/HeaderBg';
import Naver from './components/Naver';
export default {
  name: "Home",
  components:{
    Head,
    HeaderBg,
    Naver
  }
};
</script>
<style>


</style>


<style lang="less">
body * {
  list-style: none;
}
.contain {
  font-size: 14px;
  min-width: 1240px;
  
  
  
}
</style>
