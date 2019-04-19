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
          num: "1000"
        },
        {
          name: "年度总营收",
          price: "51600000"
        },
        {
          name: "年度总订单量",
          num: "102234300"
        },
        {
          name: "用户总量",
          num: "145000"
        }
      ]
    };
  },
  methods: {
    draws1() {
      let myChart = this.$echarts.init(document.getElementById("mychart1"));
      myChart.setOption({
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
            data: [25, 30, 66, 40, 30, 40, 96, 73, 75, 84, 52, 87]
          },
          {
            name: "会员",
            type: "line",
            label: {
              show: true
            },
            data: [5, 20, 36, 10, 10, 20, 76, 23, 45, 64, 12, 67]
          }
        ]
      });
      myChart.resize();
    },
    draws2() {
      let myChart = this.$echarts.init(document.getElementById("mychart2"));
      myChart.setOption({
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
              { value: 335, name: "会员" },
              { value: 310, name: "非会员" }
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
      myChart.resize();
    },
    draws3() {
      let myChart = this.$echarts.init(document.getElementById("mychart3"));
      myChart.setOption({
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
            label: {
              show: true
            },
            data: [250, 300, 660, 400, 300, 400, 960, 730, 750, 840, 520, 870]
          },
          {
            name: "蛋糕",
            type: "bar",
            stack: "总收入",
            label: {
              show: true
            },
            data: [150, 200, 360, 100, 100, 200, 760, 230, 450, 640, 120, 670]
          },
          {
            name: "绿植",
            type: "bar",
            stack: "总收入",
            label: {
              show: true
            },
            data: [110, 100, 205, 160, 400, 207, 306, 503, 405, 504, 302, 507]
          },
          {
            name: "礼品",
            type: "bar",
            stack: "总收入",
            label: {
              show: true
            },
            data: [520, 220, 160, 300, 400, 100, 106, 205, 705, 601, 202, 107]
          }
        ]
      });
      myChart.resize();
    },
    draws4() {
      let myChart = this.$echarts.init(document.getElementById("mychart4"));
      myChart.setOption({
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
              { value: 335, name: "鲜花" },
              { value: 310, name: "蛋糕" },
              { value: 234, name: "绿植" },
              { value: 135, name: "礼品" }
            ]
          }
        ]
      });
      myChart.resize();
    }
  },
  mounted() {
    setTimeout(() => {
      this.draws1();
      this.draws2();
      this.draws3();
      this.draws4();
    });
    window.onresize = () => {
      return (() => {
        this.draws1();
        this.draws2();
        this.draws3();
        this.draws4();
      })();
    };
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


