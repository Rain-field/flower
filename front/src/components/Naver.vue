<template>
  <nav>
    <div class="mall_nav">
      <div class="nav_top">
        <Dropdown  @on-click="toGoods">
          <Button type="warning">商品分类
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="1">鲜花</DropdownItem>
            <DropdownItem name="2">蛋糕</DropdownItem>
            <DropdownItem name="3">礼品</DropdownItem>
            <DropdownItem name="4">绿植</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
     toGoods(id){
       this.$router.push({name:"Goods",params:{id:id}});
    }
  },
};
</script>

<style >
.ivu-dropdown-item:hover {
  background: #ff6700;
}
.ivu-btn-warning {
  background: #ff6700;
  border-color: #ff6700;
  font-size: 16px;
}
.ivu-btn-warning:hover {
  background: #ff781f;
  border-color: #ff781f;
  font-size: 16px;
}
.ivu-dropdown-item {
  padding: 10px 25px;
}
</style>

<style lang="less">
nav {
  .mall_nav {
    width: 1240px;
    margin: auto;
    .nav_top {
      background: #ff6700;
    }
  }
}
</style>

