<template>
  <div class="soldCar">
    <div>
      <mu-tabs :value.sync="active1" inverse indicator-color="#42b983" color="#42b983" full-width>
        <mu-tab>估价</mu-tab>
        <mu-tab>卖车</mu-tab>
      </mu-tabs>
      <div class="demo-text" v-if="active1 === 0">
        <mu-col span="12" lg="4" sm="6">
          <mu-text-field
            v-model="carPrice"
            type="number"
            label="重置价格"
            placeholder="重置价格"
            icon="directions_car"
            full-width
            help-text="当前与被评估车辆相同的车辆的最低价格"
            suffix="万元"
          ></mu-text-field>
          <mu-text-field
            v-model="carMeter"
            type="number"
            label="行车里程"
            placeholder="行车里程"
            icon="directions_car"
            full-width
            suffix="万公里"
          ></mu-text-field>
          <mu-date-input
            type="year"
            icon="today"
            v-model="year"
            label="购车年份"
            placeholder="购车年份"
            container="bottomSheet"
            suffix="年"
            full-width
          ></mu-date-input>
          <mu-button color="#42b983" large full-width @click="calculate">
            <mu-icon left value="grade"></mu-icon>估价
          </mu-button>
        </mu-col>
      </div>
      <div class="demo-text col" v-if="active1 === 1">
        <mu-text-field label="姓名" v-model="value4" full-width placeholder="姓名"></mu-text-field>
        <mu-text-field v-model="carMeter" type="number" label="手机号码" placeholder="手机号码" full-width></mu-text-field>
        <mu-text-field
          v-model="carMeter"
          type="number"
          label="购车原价"
          placeholder="购车原价"
          full-width
          suffix="万元"
        ></mu-text-field>
        <mu-select label="品牌" v-model="value1" full-width placeholder="品牌">
          <mu-option v-for="option,index in options" :key="option" :label="option" :value="option"></mu-option>
        </mu-select>
        <mu-text-field
          v-model="carMeter"
          type="number"
          label="行车里程"
          placeholder="行车里程"
          full-width
          suffix="万公里"
        ></mu-text-field>
        <mu-date-input
          type="year"
          v-model="year"
          label="购车年份"
          placeholder="购车年份"
          container="bottomSheet"
          suffix="年"
          full-width
        ></mu-date-input>
        <mu-button class="mu_button" color="#42b983" large full-width>
          <mu-icon left value="grade"></mu-icon>申请
        </mu-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active1: 0,
      year: "",
      carMeter: "",
      carPrice: "",
      options: ["aaa", "bbbb"],
      value1: ""
    };
  },
  created() {
    localStorage.setItem("title", "卖车");
  },
  methods: {
    calculate() {
      // if(this.year==''||this.carMeter==''||this.carPrice==''){
      //   this.$toast.error('请全部填写以获取精准结果')
      //   return
      // }
      let now = new Date().getYear();
      let flag = 0;
      let yyear=now - this.year.getYear();
      let years = 1-yyear/10;
      let meter=1-this.carMeter/30;
      if (yyear >= 10 || this.carMeter >= 30) {
        this.$alert("对不起！您的爱车已经接近报废了呢", "估价", {
          okLabel: "难受"
        }).then(() => {
        });
        return
      }
      let cPrice=Math.round(this.carPrice*years * 100) / 100 
      let mPrice=Math.round(this.carPrice*meter * 100) / 100 
      if(cPrice>mPrice){
        let flag=cPrice
        cPrice=mPrice
        mPrice=flag
      }
      console.log(cPrice+' '+mPrice);
      this.$alert(`您的爱车估价大概在${cPrice}-${mPrice}万元之间`, "估价", {
          okLabel: "知道了"
        }).then(() => {
      });
    },
    getMeterLimit(meter) {
      if (meter == 1) return 1;
      return meter + this.getMeterLimit(meter - 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.soldCar {
  /deep/ .mu-tabs {
    z-index: 0;
  }
}
.demo-text {
  margin-top: 10px;
}
.mu_button {
  margin-bottom: 5px;
}
</style>
