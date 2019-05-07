<template>
  <div class="car_list">
    <mu-load-more @refresh="_getCollection" :refreshing="loading">
    <mu-list class="mu_list" textline="two-line" v-if="carList.length!=0">
      <mu-list-item
        @click="goDetail(item.carId)"
        v-for="(item,index) in carList"
        :key="index"
        avatar
        :ripple="false"
        button
      >
        <mu-avatar>
          <img :src="baseURL+item.carImg">
        </mu-avatar>
        <mu-list-item-content>
          <mu-list-item-title>{{ item.carTitle }}</mu-list-item-title>
          <mu-list-item-sub-title>{{ `${item.buyTime}/${item.mileage}万公里` }}</mu-list-item-sub-title>
          <mu-list-item-sub-title class="flex"><span class="price">{{ item.price }}万元</span><span class="status" :class="{'status1':item.status==0}">{{ statusList[item.status] }}</span></mu-list-item-sub-title>
        </mu-list-item-content>
        <!-- <mu-list-item-action>
            <mu-checkbox
              color="yellow700"
              v-model="selects"
              value="value1"
              uncheck-icon="star_border"
              checked-icon="star"
            ></mu-checkbox>
        </mu-list-item-action> -->
      </mu-list-item>
      <mu-divider></mu-divider>
    </mu-list>
    <div v-else style="padding-top:100px">暂时没有收藏</div>
    </mu-load-more>
  </div>
</template>
<script>
import { getCollection } from "../../api/index.js";
export default {
  data() {
    return {
      loading:false,
      openBrand: false,
      open: false,
      value3: "",
      options: ["abc", "本田", "国产"],
      chips: ["aa"],
      params: {
        lowPrice: "",
        highPrice: "",
        brand: "",
        searchVal: ""
      },
      brand: "",
      searchVal: "",
      lowPrice: "",
      highPrice: "",
      selects: "",
      fruits: ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50"],
      carList: [],
      statusList:['正在热卖','已出售','已下架'],
    };
  },
  created() {
    this._getCollection();
  },
  methods: {
    _getCollection() {
      this.loading=true
      getCollection({ userName: localStorage.getItem("userName") }, data => {
        if (data.code == 0) {
          this.carList = data.result;
          this.carList.forEach(item => {
            item.carImg = item.carImg.split(",")[0];
          });
        } else {
          this.$toast.error("网络错误");
        }
        this.loading=false
      });
    },
    goDetail(id) {
      this.$router.push({ path: "/carDetail", query: { id: id } });
    },
  }
};
</script>
<style lang="scss" scoped>
.car_list {
    /deep/ .mu-load-more {
    min-height: 300px;
  }
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
        display: flex;
        justify-content: space-between;
      }
      .price {
        color: red;
        font-weight: bold;
        font-size: 20px;
      }
      .status{
        color:#999;
        line-height: 30px;
      }
      .status1{
        color:red;
      }
    }
  }
}
</style>
