<template>
  <div class="home">
    <mu-carousel hide-controls>
      <mu-carousel-item v-for="(item,index) in carInfo.carImg" :key="index">
        <img :src="baseURL+item">
      </mu-carousel-item>
      <!-- <mu-carousel-item>
        <img src="../../assets/images/fu2012/fu2.jpg">
      </mu-carousel-item>
      <mu-carousel-item>
        <img src="../../assets/images/fu2012/fu3.jpg">
      </mu-carousel-item>
      <mu-carousel-item>
        <img src="../../assets/images/fu2012/fu4.jpg">
      </mu-carousel-item>-->
    </mu-carousel>
    <div class="info_header">
      <span>{{ carInfo.carTitle }}</span>
      <div class="info_price">
        <span>车主报价：</span>
        <span class="price">{{ carInfo.price }}万元</span>
        <mu-button color="#42b983" @click="phoneCall">询问客服</mu-button>
        <mu-checkbox
          @change="collect"
          color="yellow700"
          v-model="selects"
          uncheck-icon="star_border"
          checked-icon="star"
        ></mu-checkbox>
      </div>
    </div>
    <div class="divider"></div>
    <mu-tabs
      class="mu_tabs"
      :value.sync="active1"
      inverse
      indicator-color="#42b983"
      color="#42b983"
      full-width
    >
      <mu-tab>车辆信息</mu-tab>
      <mu-tab>车主介绍</mu-tab>
    </mu-tabs>
    <div class="info" v-if="active1 === 0">
      <!-- <mu-sub-header>车辆信息</mu-sub-header> -->
      <mu-list>
        <mu-list-item>
          <mu-list-item-action>
            <div class="info_label">购车日期</div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{ carInfo.buyTime?carInfo.buyTime:'未知' }}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-action>
            <div class="info_label">年险到期</div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{ carInfo.annualRisk?carInfo.annualRisk:'已过期' }}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-action>
            <div class="info_label">交强险到期</div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{ carInfo.compulsoryInsurance?carInfo.compulsoryInsurance:'已过期' }}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-action>
            <div class="info_label">商业险到期</div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{ carInfo.commercialInsurance?carInfo.commercialInsurance:'已过期' }}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-action>
            <div class="info_label">行驶里程</div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{ carInfo.mileage?carInfo.buyTime+'万公里':'未知' }}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-action>
            <div class="info_label">排放标准</div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{ carInfo.emissionStandard?carInfo.emissionStandard:'未知' }}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-action>
            <div class="info_label">排放量</div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{ carInfo.emissions?carInfo.emissions:'未知' }}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-action>
            <div class="info_label">过户次数</div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{ carInfo.transferTimes?carInfo.transferTimes:'未知' }}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-action>
            <div class="info_label">变速箱</div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{ carInfo.variableSpeed?carInfo.variableSpeed:'未知' }}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <!-- <mu-list-item>
          <mu-list-item-action>
            <div class="info_label">技术评估</div>
        </mu-list-item-action>-->
        <!-- <mu-list-item-content> -->
        <!-- <mu-list-item-title>{{ carInfo.assess?carInfo.assess:'未知' }}</mu-list-item-title> -->
        <!-- </mu-list-item-content>
        </mu-list-item>-->
      </mu-list>
      <div class="divider"></div>
      <mu-sub-header>技术评估</mu-sub-header>
      <mu-card-text>{{ carInfo.assess?carInfo.assess:'车主暂无对车子的介绍' }}</mu-card-text>
    </div>
    <div v-if="active1 === 1">
      <!-- <mu-card-header class="card" title="Myron Avatar" sub-title="sub title">
        <mu-avatar slot="avatar">
          <img src="../../assets/logo.png">
        </mu-avatar>
        <mu-button class="mu-button" color="#42b983">咨询详情</mu-button>
      </mu-card-header>-->
      <!-- <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title> -->
      <mu-card-text>{{ carInfo.introduction?carInfo.introduction:'车主暂无对车子的介绍' }}</mu-card-text>
    </div>
    <div class="divider"></div>
    <div class="car_list">
      <mu-sub-header>发现相似低价好车</mu-sub-header>
      <mu-list textline="two-line">
        <mu-list-item
          @click="goDetail(item.carId)"
          v-for="(item,index) in carList"
          :key="index"
          avatar
          :ripple="false"
          button
        >
          <mu-avatar>
            <img :src="item.carImg">
          </mu-avatar>
          <mu-list-item-content>
            <mu-list-item-title>{{ item.carTitle }}</mu-list-item-title>
            <mu-list-item-sub-title>{{ `${item.buyTime}/${item.mileage}万公里` }}</mu-list-item-sub-title>
            <mu-list-item-sub-title class="price">{{ item.price }}万元</mu-list-item-sub-title>
          </mu-list-item-content>
          <!-- <mu-list-item-action>
            <mu-checkbox
              color="yellow700"
              v-model="selects"
              value="value1"
              uncheck-icon="star_border"
              checked-icon="star"
            ></mu-checkbox>
          </mu-list-item-action>-->
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
    </div>
    <div style="height:40px"></div>
    <mu-button @click="_appoint" class="float_button" full-width color="#42b983">立即预约</mu-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import {
  getCarDetail,
  getSimilar,
  collect,
  isCollect,
  clickNum,
  appoint
} from "../../api/index.js";
export default {
  name: "home",
  inject: ["reload"],
  components: {
    HelloWorld
  },
  data() {
    return {
      active1: 0,
      selects: false,
      searchVal: "",
      carId: this.$route.query.id,
      carInfo: {},
      carList: [],
      phoneNum: 12345678900
    };
  },
  created() {
    window.scrollTo(0, 0);
    this._getDetail();
    if (localStorage.getItem("userName")) {
      this.getCollect();
    }
  },
  methods: {
    phoneCall() {
      if (!localStorage.getItem("userName")) {
        this.$confirm("请先登录", "提示", {
          type: "warning"
        }).then(({ result }) => {
          if (result) {
            this.$router.push({ path: "/" });
          } else {
          }
        });
      } else {
        window.location.href = "tel://" + this.phoneNum;
      }
    },
    _appoint() {
      if (!localStorage.getItem("userName")) {
        this.$confirm("请先登录", "提示", {
          type: "warning"
        }).then(({ result }) => {
          if (result) {
            this.$router.push({ path: "/" });
          } else {
          }
        });
      } else {
        appoint(
          {
            userName: localStorage.getItem("userName"),
            price: this.carInfo.price,
            carTitle: this.carInfo.carTitle,
            carId: this.carId,
            status: 0
          },
          data => {
            if (data.isSuccess) {
              this.$toast.success("预约成功");
            } else if (data.code == 0) {
              this.$toast.error("您已预约，请勿重复预约");
            } else {
              this.$toast.error("预约失败，请稍后再试");
            }
          }
        );
      }
    },
    _clickNum() {
      clickNum(
        { carId: this.carId, clickNum: ++this.carInfo.clickNum },
        data => {}
      );
    },
    getCollect() {
      isCollect(
        { userName: localStorage.getItem("userName"), carId: this.carId },
        data => {
          this.selects = data[0].status == 1 ? true : false;
        }
      );
    },
    _getList() {
      getSimilar({ price: this.carInfo.price + 5, carId: this.carId }, data => {
        this.carList = data.data.result;
        this.carList.forEach(item => {
          item.carImg = item.carImg.split(",")[0];
        });
      });
    },
    _getDetail() {
      getCarDetail({ carId: this.carId }, data => {
        this.carInfo = data.data.result[0];
        this.carInfo.variableSpeed = 0
          ? (this.carInfo.variableSpeed = "自动")
          : (this.carInfo.variableSpeed = "手动");
        this._getList();
        this._clickNum();
        this.carInfo.carImg = this.carInfo.carImg.split(",");
      });
    },
    collect() {
      //还需要判断登录情况
      if (localStorage.getItem("userName")) {
        collect(
          {
            userName: localStorage.getItem("userName"),
            carId: this.carId,
            status: this.selects
          },
          data => {
            if (data.code == 0) {
              if (this.selects) {
                this.$toast.success("已收藏");
              } else {
                this.$toast.success("取消收藏");
              }
            }
          }
        );
      } else {
        this.$toast.error("您尚未登录");
      }
    },
    goDetail(id) {
      this.$router.push({ path: "/carDetail", query: { id: id } });
      this.reload();
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  .float_button {
    position: fixed;
    bottom: 56px;
    height: 40px;
    left: 0;
  }
  background-color: #fff;
  .card {
    .mu-button {
      margin-top: 4px;
      vertical-align: top;
    }
  }
  .info_header {
    background-color: #fff;
    font-size: 20px;
    text-align: left;
    margin-left: 10px;
    .info_price {
      padding: 2px 0;
      .price {
        color: red;
        font-weight: bold;
        display: inline-block;
        margin-right: 20px;
      }
      .xunwen {
      }
    }
  }
  .mu_tabs {
    background-color: #fff;
  }
  .info {
    &_label {
      margin-right: 20px;
      width: 100px;
      text-align: left;
    }
  }
  .search {
    padding-top: 1px;
    input,
    button {
      border: none;
      outline: none;
    }
    input {
      width: 100%;
      height: 42px;
      padding-left: 13px;
      padding-right: 110px;
    }
    button {
      height: 38px;
      width: 42px;
      cursor: pointer;
      position: absolute;
    }
  }
  .bar6 input {
    border: 2px solid #42b983;
    // border-radius:5px;
    background: transparent;
    top: 0;
    right: 0;
  }
  .bar6 button {
    // background: #42b983;
    // border-radius:0 5px 5px 0;
    width: 100px;
    top: 59px;
    right: 0px;
  }
  .bar6 button:before {
    // content: "搜索";
    font-size: 13px;
    // color: #f9f0da;
  }
  .mu-checkbox {
    right: -20px;
    top: 5px;
  }
  .button-wrapper {
    flex-wrap: wrap;
    text-align: center;
    .mu-button {
      width: 45%;
      margin: 8px;
      vertical-align: top;
      box-sizing: border-box;
    }
  }
  .mu-carousel {
    height: 230px;
  }
  .mu-carousel-item > img {
    width: 100%;
    // height: 100%;
  }
}
.mu-sub-header {
  padding: 0;
  background-color: #fff;
}
.car_list {
  .mu-sub-header {
    padding: 0;
    background-color: #fff;
  }
  /deep/ .mu-item-content {
    margin-left: 10px;
  }
  .mu-avatar img {
    border-radius: 0 !important;
  }
  .mu-list {
    padding: 0;
    /deep/ .mu-item {
      height: 120px;
      padding: 0;
      padding-right: 10px;
      border-bottom: 1px silver solid;
      .mu-item-content {
        padding-top: 2px;
      }
      .mu-avatar {
        height: 100% !important;
        width: 138px !important;
        img {
          height: 100% !important;
          width: 138px !important;
        }
      }
      .mu-item-title {
        // font-size: .37333rem;
        display: -webkit-box;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: auto;
        font-weight: bold;
        white-space: normal;
      }
      .mu-item-sub-title {
        color: #999;
      }
      .price {
        color: red;
        font-weight: bold;
        font-size: 20px;
      }
    }
  }
}
</style>