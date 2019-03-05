<template>
  <Layout :style="{paddingTop:'20px'}">
    <Content :style="{ minHeight: '300px', background: '#fff'}" id="help">
      <Breadcrumb :style="{margin: '16px 5px'}">
        <BreadcrumbItem :to="{name:'Home'}">首页</BreadcrumbItem>
        <BreadcrumbItem>帮助中心</BreadcrumbItem>
      </Breadcrumb>
      <div class="helpWrap">
        <h2>帮助中心</h2>
        <template v-for="help in helps">
          <div class="helpTitle">{{help.title}}</div>
          <div class="helpCOntent">
            <p v-for="(contentItem, index) in help.content" :key="index">{{contentItem}}</p>
          </div>
        </template>
      </div>
    </Content>
  </Layout>
</template>

<script>
export default {
  name: "Help",
  data() {
    return {
      helps: [
        {
          title: "关于鲜花/蛋糕",
          content: [
            "我们可以保证送到您手中时鲜花/蛋糕是新鲜的，请收货人在收到后务必立刻进行保鲜处理，以免影响货品的品质",
            "由于鲜花的季节性和供货渠道变化性较强，可能您选择的某种花材无法供应，对于非主要花材，我们在尽量不影响您所选的鲜花效果的情况下，按照寓意相同、类似花材价值相同替代原则代替，对于主要花材，我们将在征求您的意见后进行处理，恳请您谅解；",
            "由于鲜花/蛋糕的保鲜时间短，如果在您要求送达的时间内，收货人不在您所提供的地址且该地址无认识收货人的代收人，我们将与收货人和订购人联系，如果都无法联系上耽误配送，我们可根据情况决定是否再次配送。如果收货人非我方原因拒收货品，我们将与订购人联系沟通，如果鲜花/蛋糕保鲜期已过，仍无法通过订单所留联系方式联系到订购人，或订购人知情后仍未给出回复，订单视为送达。",
            "如果您需要送达的城市不在我们《配送范围》列表，请您与我们的客服人员联系，我们将尽力帮您解决。",
            "如果您在填写订单时：所要送达的地址不在我们的《配送范围》，或者远远超出了市区，可能需要加收配送费，请您与我们的客服人员沟通确认。如果我们无法通过您所留联系方式及时联系到您，超出配送时间3天，将按撤单处理，您所付的货款会将默认存入您的会员帐户，在与您取得联系后，根据您指定的方式退回。"
          ]
        },
        {
          title: "关于绿植",
          content: [
            "我们可以保证送到您手中的绿植花卉是新鲜的，并且品质优良",
            "由于绿植花卉（包括盆景）是在不停的生长中，所以您所收到的实物会与网上的照片有所不同，希望您能谅解。 由于绿植是不易运输的产品，如果在您要求送达的时间内收货人不在您所提供的地址，或者我们根本无法联系，或者收货人拒收，我们可根据情况决定是否再次递送。",
            "如果您需要送达的城市不在我们《配送范围》列表，请您与我们的客服人员联系，我们将尽力帮您解决。 ",
            "如果您在填写订单时：所要送达的地址不在我们的《配送范围》，或者远远超出了市区，可能需要加收配送费，请您与我们的客服人员沟通确认。如果我们无法通过您所留联系方式及时联系到您，超出配送时间3天，将按撤单处理，您所付的货款会将默认存入您的会员帐户，在与您取得联系后，根据您指定的方式退回。"
          ]
        },
        {
            title: "关于礼品",
            content:[
                "提示： 其他通过快递（包括平邮、EMS）方式配送的商品适用此服务说明。"
            ]
        },
        {
            title: "其他",
            content:[
                "更多问题尽情咨询客服"
            ]
        }
      ]
    };
  }
};
</script>

<style lang="">
</style>

<style lang="less" scoped>
#help {
  margin-top: 20px;
  width: 1240px;
  margin: auto;
  .helpWrap {
    margin: 20px;
    padding: 0 100px;
    h2 {
      text-align: center;
      margin-bottom: 20px;
    }
    .helpTitle {
      color: white;
      text-align: center;
      width: 15%;
      background: #ff6700;
      padding: 0 10px;
      margin-top: 20px;
    }
    .helpCOntent {
      width: 100%;
      overflow: hidden;
      p {
        text-indent: 14px;
        margin: 10px 0;
      }
    }
  }
}
</style>
