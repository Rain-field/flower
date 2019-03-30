
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider :style="{ background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <div class="logo"><img src="@/assets/logo.png" alt=""></div>
                <Menu active-name="1-1" theme="light" width="auto">
                    <MenuItem name="1-1" :to="{name:'ShowData'}">
                        <Icon type="md-home" />
                        <span>首页</span>
                    </MenuItem>
                    <MenuItem name="1-2" :to="{name:'UserManagement'}">
                        <Icon type="md-person" />
                        <span>用户管理</span>
                    </MenuItem>
                    <MenuItem name="1-3" :to="{name:'GoodManagement'}">
                        <Icon type="md-search" />
                        <span>商品管理</span>
                    </MenuItem>
                    <MenuItem name="1-4" :to="{name:'GoodAdd'}">
                        <Icon type="ios-create" />
                        <span>添加商品</span>
                    </MenuItem>
                    <MenuItem name="1-5" :to="{name:'OrderManagement'}">
                      <Icon type="md-cart" />
                        <span>订单管理</span>
                    </MenuItem>
                    
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                    <ul class="headerLists">
                        <li><Icon type="md-volume-down" size="22"/><span>消息通知</span></li>
                        <li @click="logout"><Icon type="md-power" size="22"/><span>退出</span></li>
                        <li class="headImg"><img src="@/assets/head.jpg" alt=""></li>
                    </ul>
                </Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>首页</BreadcrumbItem>
                        <BreadcrumbItem v-if="title">{{title}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Card style="padding:40px">
                        <router-view></router-view>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                title:'',
            };
        },
        methods: {
            logout() {
                let vm = this;
               vm.$Modal.confirm({
                   title:"提示",
                   content:"确认要退出吗？",
                   onOk() {
                        vm.$router.push({name:'Login'});
                   }
               })
            }
        },
        updated() {
            if(this.$route.meta !== '首页'){
                this.title = this.$route.meta;
            }else{
                this.title = '';
            }
        },
    }
</script>

<style scoped lang="less">
.logo{
    height: 75px;
    width: 175px;
    margin:21px auto;
    img{
        width: 100%;
        height: 100%;
    }
}
.headerLists{
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    li{
        cursor: pointer;
        margin-left: 20px;
        font-size: 16px;
        span{
            vertical-align: middle;
        }
    }
    li:hover{
         color: #2d8cf0;
    }
    .headImg{
        width: 40px;
        height: 40px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
}
</style>