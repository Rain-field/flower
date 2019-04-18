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
        <div class="itemTop">用户、会员新增趋势</div>
        <div class="itemBottom" ref="mychart1" id="mychart1"></div>
      </div>
      <div class="dataItem dataItem2">
        <div class="itemTop">用户总量分类</div>
        <div class="itemBottom" id="mychart2"></div>
      </div>
    </div>
    <div class="dataNaver">
      <div class="dataItem dataItem2">
        <div class="itemTop">总营收</div>
        <div class="itemBottom"></div>
      </div>
      <div class="dataItem dataItem2">
        <div class="itemTop">营收类目</div>
        <div class="itemBottom"></div>
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
          name: "年度总收入",
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
          data: ["用户", "会员"],
          left: 'right',
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
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "用户",
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
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#4ecb73", "#3aa1ff"],
        legend: {
          data: ["非会员", "会员"],
          left: 'right',
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        series: [
         {
            name: '用户总量',
            type: 'pie',
            radius : '65%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'会员'},
                {value:310, name:'非会员'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
        ]
      });
      myChart.resize();
    }
  },
  mounted() {
    this.draws1();
    this.draws2();
    window.onresize = () => {
      return (() => {
        this.draws1();
        this.draws2();
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
  }
}
</style>


