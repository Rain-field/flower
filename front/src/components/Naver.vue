<template>
  <nav>
    <div class="mall_nav">
      <div class="nav_top">
        <Dropdown>
          <Button type="warning">商品分类
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <Dropdown placement="right-start">
              <DropdownItem>鲜花
                <Icon type="ios-arrow-forward"></Icon>
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem>送长辈</DropdownItem>
                <DropdownItem>送女友</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <DropdownItem>蛋糕</DropdownItem>
            <DropdownItem>礼品</DropdownItem>
            <DropdownItem>绿植</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
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

