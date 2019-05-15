<template>
  <div class="showData">
    <div class="dataHeader">
      <div class="dataItem" v-for="(item, index) in headers" :key="index">
        <div class="itemTop">{{item.name}}</div>
        <div class="itemBottom" v-if="item.num">{{item.num}}</div>
        <div class="itemBottom" v-if="item.price">￥{{Number(item.price).toLocaleString('en-US')}}</div>
      </div>
    </div>
    <div class="dataNaver">
      <div class="dataItem dataItem2">
        <div class="itemTop">注册用户、会员新增趋势</div>
        <div class="itemBottom" id="mychart1"></div>
      </div>
      <div class="dataItem dataItem2">
        <div class="itemTop">用户总量分类</div>
        <div class="itemBottom" id="mychart2"></div>
      </div>
    </div>
    <div class="dataNaver">
      <div class="dataItem dataItem3">
        <div class="itemTop">商品总营收</div>
        <div class="itemBottom" id="mychart3"></div>
      </div>
      <div class="dataItem dataItem4">
        <div class="itemTop">营收类目</div>
        <div class="itemBottom" id="mychart4"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          name: "年度总销量",
          num: "0"
        },
        {
          name: "年度总营收",
          price: "0"
        },
        {
          name: "年度总订单量",
          num: "0"
        },
        {
          name: "用户总量",
          num: "0"
        }
      ]
    };
  },
  methods: {
    getDatas() {
      // 初始化筛选数据
      this.$axios.get(this.baseURL + "/orders").then(res => {
          res = res.data;
          let price = 0;
          let number = 0;
          this.headers[2].num = res.length;
          let type = 1;//保存商品类型
          let draws4Arr = new Array(4).fill(0);
          let draws3Arr1 = new Array(12).fill(0);//不同商品类型的数组
          let draws3Arr2 = new Array(12).fill(0);
          let draws3Arr3 = new Array(12).fill(0);
          let draws3Arr4 = new Array(12).fill(0);
          let toTalPrice = 0;//保存不同类型商品总收入
          let month = 0;//月份
          res.forEach(function(item,index){
            number += item.data.length;
            price += item.price;
            month = Number(item.time.slice(5,7))-1;
            item.data.forEach(function(item2,index2){
              type = item2.num.slice(0,1);
              // console.log(type);
              draws4Arr[type-1] += Number(item2.price)*item2.quantity;
              if(type == 1){
                draws3Arr1[month] += Number(item2.price)*item2.quantity;
              }else if(type == 2){
                draws3Arr2[month] += Number(item2.price)*item2.quantity;
              }else if(type == 3){
                draws3Arr3[month] += Number(item2.price)*item2.quantity;
              }else{
                draws3Arr4[month] += Number(item2.price)*item2.quantity;
              }
            })
          })
          this.draws3(draws3Arr1,draws3Arr2,draws3Arr3,draws3Arr4);
          this.draws4(draws4Arr);
          this.headers[1].price = price;
          this.headers[0].num = number;
        })
      this.$axios.get(this.baseURL + "/users").then(res => {
          // console.log(res.data);
          res = res.data;
          this.headers[3].num = res.length;
          let vipNumber = 0;//会员数量
          let number = 0;//非会员数量
          let month = 0;//月份
          let monthArr = new Array(12).fill(0);//注册用户数组
          let monthVipArr = new Array(12).fill(0);//会员数组
          res.forEach(function(item,index){
            month = Number(item.time.slice(5,7))-1;
            if(item.isVip == 1){
              monthVipArr[month] ++;
              vipNumber++;
            }else{
              number++;
            }
            monthArr[month] ++; 
          })
          this.draws1(monthArr,monthVipArr);
          this.draws2(vipNumber,number);
        })

    },
    draws1(monthArr,monthVipArr) {
      let myChart1 = this.$echarts.init(document.getElementById("mychart1"));
      myChart1.setOption({
        tooltip: {},
        color: ["#4ecb73", "#3aa1ff"],
        legend: {
          data: ["注册用户", "会员"],
          left: "right"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            show: false
          },
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {
          name: "(个)",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "注册用户",
            type: "line",
            label: {
              show: true
            },
            data: monthArr
          },
          {
            name: "会员",
            type: "line",
            label: {
              show: true
            },
            data: monthVipArr
          }
        ]
      });
      myChart1.resize();
    },
    draws2(vipNumber,number) {
      let myChart2 = this.$echarts.init(document.getElementById("mychart2"));
      myChart2.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}个 ({d}%)"
        },
        color: ["#4ecb73", "#3aa1ff"],
        legend: {
          data: ["非会员", "会员"],
          left: "right"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        series: [
          {
            name: "用户总量",
            type: "pie",
            radius: "65%",
            center: ["50%", "60%"],
            data: [
              { value: vipNumber, name: "会员" },
              { value: number, name: "非会员" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      myChart2.resize();
    },
    draws3(arr1,arr2,arr3,arr4) {
      let myChart3 = this.$echarts.init(document.getElementById("mychart3"));
      myChart3.setOption({
        tooltip: {},
        color: ["#4ecb73", "#3aa1ff", "#edafda", "#36cbcb"],
        legend: {
          data: ["鲜花", "蛋糕", "绿植", "礼品"],
          left: "right"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {
          name: "(元)",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "鲜花",
            type: "bar",
            stack: "总收入",
            label: {
              show: true
            },
            data: arr1
          },
          {
            name: "蛋糕",
            type: "bar",
            stack: "总收入",
            label: {
              show: true
            },
            data: arr2
          },
          {
            name: "绿植",
            type: "bar",
            stack: "总收入",
            label: {
              show: true
            },
            data: arr3
          },
          {
            name: "礼品",
            type: "bar",
            stack: "总收入",
            label: {
              show: true
            },
            data: arr4
          }
        ]
      });
      myChart3.resize();
    },
    draws4(arr) {
      let myChart4 = this.$echarts.init(document.getElementById("mychart4"));
      myChart4.setOption({
        color: ["#4ecb73", "#3aa1ff", "#edafda", "#36cbcb"],
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{a} <br/>{b}: {c} ({d}%)"
        // },
        legend: {
          x: "right",
          data: ["鲜花", "蛋糕", "绿植", "礼品"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            center:['52%','55%'],
            radius: ["55%", "80%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                    show: false,
                    position: 'center',
                        formatter:'{b}'+'\n\n'+'{c}元 ,{d}%'
                },
              emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '18',
                        fontWeight: 'bold'
                    },
                }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: arr[0], name: "鲜花" },
              { value: arr[1], name: "蛋糕" },
              { value: arr[2], name: "绿植" },
              { value: arr[3], name: "礼品" }
            ]
          }
        ]
      });
      myChart4.resize();
    }
  },
  mounted() {
    this.getDatas();
    setTimeout(() => {
      // this.draws1();
      // this.draws2();
      // this.draws3();
      // this.draws4();
    });
  }
};
</script>

<style lang="less" scoped>
.showData {
  padding: 20px;
  .dataHeader,
  .dataNaver {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .dataItem {
      width: 22%;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      // padding: 20px;
      .itemTop {
        border-top: 4px solid #2d8cf0;
        padding: 10px;
        letter-spacing: 2px;
        border-bottom: 1px solid #eee;
      }
      .itemBottom {
        padding: 20px 10px;
        font-size: 24px;
        font-weight: bold;
      }
    }
    .dataItem2 {
      width: 48%;
      .itemBottom {
        height: 300px;
      }
    }
    .dataItem3 {
      width: 65%;
      .itemBottom {
        height: 350px;
      }
    }
    .dataItem4 {
      width: 33%;
      .itemBottom {
        height: 350px;
      }
    }
  }
}
</style>


