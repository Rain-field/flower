<template>
  <div id="lunbo">
    <Carousel autoplay loop :autoplay-speed="setting.autoplaySpeed" @on-change="changePic">
      <CarouselItem v-for="(item, index) in imgs" :key="index">
        <div class="demo-carousel">
          <img :src=item.src  alt>
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  name: "LunBo",
  data() {
    return {
      setting: {
        autoplaySpeed: 4000
      },
      imgs: [
        {src:this.baseImg+'/lunbo/001.jpg',url:''},
        {src:this.baseImg+'/lunbo/002.jpg',url:''},
        {src:this.baseImg+'/lunbo/003.jpg',url:''},
        {src:this.baseImg+'/lunbo/004.jpg',url:''},
        {src:this.baseImg+'/lunbo/005.jpg',url:''}
      ]
    };
  },
  methods: {
    changePic(oldvalue, value) {
      // console.log(oldvalue);
      // console.log(value);
    }
  }
};
</script>

<style scoped>
#lunbo {
  width: 1240px;
  margin: auto;
}
img {
  width: 100%;
  height: 50%;
}
</style>