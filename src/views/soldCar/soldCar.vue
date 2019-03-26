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
            icon="event_note"
            full-width
            help-text="当前与被评估车辆相同车辆的最低价格"
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
            <mu-icon left></mu-icon>估价
          </mu-button>
        </mu-col>
      </div>
      <div class="demo-text col" v-if="active1 === 1">
        <!-- <mu-text-field label="姓名" v-model="value4" full-width placeholder="姓名"></mu-text-field>
        <mu-text-field v-model="carMeter" type="number" label="手机号码" placeholder="手机号码" full-width></mu-text-field>
        <mu-text-field
          v-model="carPrice"
          type="number"
          label="重置价格"
          placeholder="重置价格"
          full-width
          help-text="当前与被评估车辆相同车辆的最低价格"
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
        ></mu-date-input>-->
        <mu-form ref="form" :model="form" class="mu-demo-form">
          <mu-form-item prop="name" label="名称" :rules="rules">
            <mu-text-field v-model="form.name" placeholder="请输入车辆名称" prop="name"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="phone" label="手机号码" :rules="rules">
            <mu-text-field
              v-model="form.phone"
              type="number"
              placeholder="手机号码"
              full-width
              prop="phone"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="price" help-text="当前与被评估车辆相同车辆的最低价格" label="重置价格" :rules="rules">
            <mu-text-field
              v-model="form.price"
              type="number"
              placeholder="重置价格"
              full-width
              suffix="万元"
              prop="price"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="brand" label="品牌" :rules="rules">
            <mu-select v-model="form.brand" full-width placeholder="品牌">
              <mu-option
                v-for="(option,index) in brandList"
                :key="index"
                :label="option.brand"
                :value="option.brand"
              ></mu-option>
            </mu-select>
          </mu-form-item>
          <mu-form-item prop="mileage" label="行驶里程" :rules="rules">
            <mu-text-field
              v-model="form.mileage"
              type="number"
              placeholder="行车里程"
              full-width
              suffix="万公里"
              prop="mileage"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="year" label="购车年份" :rules="rules">
            <mu-date-input
              type="year"
              v-model="form.year"
              placeholder="购车年份"
              container="bottomSheet"
              suffix="年"
              full-width
            ></mu-date-input>
          </mu-form-item>
        </mu-form>
        <mu-button @click="apply" class="mu_button" color="#42b983" large full-width>
          <mu-icon left></mu-icon>申请
        </mu-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getBrand, apply } from "../../api/index.js";
export default {
  data() {
    return {
      active1: 0,
      year: "",
      carMeter: "",
      carPrice: "",
      brandList: [],
      value1: "",
      form: {
        name: "",
        phone: "",
        brand: "",
        year: "",
        mileage: "",
        price: ""
      },
      rules: [{ validate: val => !!val, message: "该项不可为空！" }]
    };
  },
  created() {
    localStorage.setItem("title", "卖车");
    this._getBrand();
  },
  methods: {
    _getBrand() {
      getBrand({}, data => {
        this.brandList = data.data.result;
      });
    },
    apply() {
      if(!localStorage.getItem('userName')){
          this.$confirm('请先登录', '提示', {
        type: 'warning'
      }).then(({ result }) => {
        if (result) {
          this.$router.push({path: '/'})
        } else {
        }
      });
      }else{
      this.$refs.form.validate().then(result => {
        if (result) {
          let form = Object.assign({},this.form);
          form.year = 1900 + form.year.getYear();
          apply({ userName: localStorage.getItem("userName"), form }, data => {
            if (data.isSuccess) {
              this.$toast.success("申请成功");
              this.form = {
                name: "",
                phone: "",
                brand: "",
                year: "",
                mileage: "",
                price: ""
              };
            } else {
              this.$toast.error("申请失败，请稍后再试");
            }
          });
        }
      });
      }
    },
    calculate() {
      if (this.year == "" || this.carMeter == "" || this.carPrice == "") {
        this.$toast.error("请全部填写以获取精准结果");
        return;
      }
      let now = new Date().getYear();
      let flag = 0;
      let yyear = now - this.year.getYear();
      let years = 1 - yyear / 10;
      let meter = 1 - this.carMeter / 30;
      if (yyear >= 10 || this.carMeter >= 30) {
        this.$alert("对不起！您的爱车已经接近报废了呢", "估价", {
          okLabel: "难受"
        }).then(() => {});
        return;
      }
      let cPrice = Math.round(this.carPrice * years * 100) / 100;
      let mPrice = Math.round(this.carPrice * meter * 100) / 100;
      if (cPrice > mPrice) {
        let flag = cPrice;
        cPrice = mPrice;
        mPrice = flag;
      }
      console.log(cPrice + " " + mPrice);
      this.$alert(`您的爱车估价大概在${cPrice}-${mPrice}万元之间`, "估价", {
        okLabel: "知道了"
      }).then(() => {});
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

.mu-demo-form {
  text-align: left;
}
.demo-text {
  margin-top: 10px;
}
.mu_button {
  margin-bottom: 5px;
}
</style>
