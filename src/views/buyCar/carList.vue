<template>
  <div class="car_list" ref="carList">
    <div class="header">
      <div class="search bar6">
        <input type="text" v-model="searchVal" placeholder="搜索您要的车">
        <mu-button color="#42b983" @click="search">
          <mu-icon left value="search "></mu-icon>
          <span>搜索</span>
        </mu-button>
      </div>
      <div class="shaixuan">
        <mu-button @click="openBotttomSheet">价格筛选</mu-button>
        <mu-button @click="openBrandBox">品牌筛选</mu-button>
        <mu-bottom-sheet :open.sync="open">
          <mu-col>
            <mu-auto-complete
              placeholder="最低价格"
              label="最低价格"
              :max-search-results="5"
              v-model="lowPrice"
              open-on-focus
              suffix="万元"
            ></mu-auto-complete>
            <mu-auto-complete
              placeholder="最高价格"
              label="最高价格"
              :max-search-results="5"
              v-model="highPrice"
              open-on-focus
              suffix="万元"
            ></mu-auto-complete>
          </mu-col>
          <mu-button @click="okPrice" color="#42b983" full-width>确定</mu-button>
          <mu-button @click="closeBottomSheet" color="#b9f6ca" full-width>取消</mu-button>
        </mu-bottom-sheet>
        <mu-bottom-sheet :open.sync="openBrand">
          <mu-col>
            <mu-select label="Normal" v-model="brand" full-width placeholder="请选择想要的品牌">
              <mu-option
                v-for="(option,index) in brandList"
                :key="index"
                :label="option.brand"
                :value="option.brand"
              ></mu-option>
            </mu-select>
          </mu-col>
          <mu-button @click="okBrand" color="#42b983" full-width>确定</mu-button>
          <mu-button @click="closeBrandBox" color="#b9f6ca" full-width>取消</mu-button>
        </mu-bottom-sheet>
      </div>
      <div class="chiplist">
        <mu-row>
          <!-- <mu-chip class="demo-chip" color="#42b983" v-for="chip, index in chips" :key="chip"  @delete="remove(index)" delete>{{chip}}</mu-chip> -->
          <!-- <mu-button color="primary" v-if="chips.length === 0" @click="reset">reset</mu-button> -->
          <mu-chip
            v-if="params.lowPrice"
            v-model="params.lowPrice"
            class="demo-chip"
            @delete="handleClose('lowPrice')"
            delete
            color="#42b983"
          >{{ params.lowPrice }}万元以上</mu-chip>
          <mu-chip
            v-if="params.highPrice"
            v-model="params.highPrice"
            class="demo-chip"
            @delete="handleClose('highPrice')"
            delete
            color="#42b983"
          >{{ params.highPrice }}万元以下</mu-chip>
          <mu-chip
            v-if="params.brand"
            v-model="params.brand"
            class="demo-chip"
            @delete="handleClose('brand')"
            delete
            color="#42b983"
          >{{ params.brand }}</mu-chip>
          <mu-chip
            v-if="params.searchVal"
            v-model="params.searchVal"
            class="demo-chip"
            @delete="handleClose('searchVal')"
            delete
            color="#42b983"
          >{{ params.searchVal }}</mu-chip>
          <!--   <mu-chip class="demo-chip" color="teal" @delete="handleClose" delete>
    <mu-avatar :size="32" color="blue">
      <mu-icon value="face"></mu-icon>
    </mu-avatar>
    icon avatar chip
          </mu-chip>-->
        </mu-row>
      </div>
    </div>
    <mu-container
      ref="container"
      class="demo-loadmore-content"
      :class="{'mrtop':params.searchVal||params.lowPrice||params.highPrice||params.brand}"
    >
      <mu-load-more
        @refresh="_getCarList"
        :refreshing="refreshing"
        :loaded-all="loadAll"
        :loading="loading"
        @load="load"
      >
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
        </mu-list>
        <div v-else style="padding-top:100px">暂时找不到您想要的爱车呢！</div>
      </mu-load-more>
      <div v-if="loadAll" style="padding:15px">已经到底了</div>
    </mu-container>
  </div>
</template>
<script>
import { carList, getBrand } from "../../api/index.js";
export default {
  data() {
    return {
      openBrand: false,
      loadAll: false,
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
      brandList: [],
      num: 10,
      refreshing: false,
      loading: false,
      text: "List",
      page: 0
    };
  },
  mounted() {
    // window.addEventListener('scroll',()=>{
    //   console.log("schei"+'   '+this.$refs.container.scrollHeight)
    //   console.log("sctop"+this.$refs.carList.scrollTop+'   '+this.$refs.container.scrollTop)
    // },true)
  },
  created() {
    localStorage.setItem("title", "买车");
    this.params = this.$store.state.params;
    if (this.$route.query.searchVal) {
      this.searchVal = this.params.searchVal = this.$route.query.searchVal;
    }
    if (this.$route.query.brand) {
      this.brand = this.params.brand = this.$route.query.brand;
    }
    this._getCarList();
    this._getBrand();
  },
  methods: {
    _getBrand() {
      getBrand({}, data => {
        this.brandList = data.data.result;
      });
    },
    _getCarList() {
      this.refreshing = true;
      // this.$refs.container.scrollTop = 0;
      let params = this.params;
      carList({ params, page: 0 }, data => {
        this.carList = data.data.result;
        this.carList.forEach(item => {
          item.carImg = item.carImg.split(",")[0];
        });
        this.refreshing = false;
      });
    },
    goDetail(id) {
      this.$router.push({ path: "/carDetail", query: { id: id } });
    },
    handleClose(key) {
      this.params[key] = "";
      if (key == "searchVal") {
        this.searchVal = "";
      }
      this._getCarList();
    },
    load() {
      this.loading = true;
      let params = this.params;
      this.page++;
      carList({ params, page: this.page }, data => {
        if (data.data.result.length < 10) {
          this.loadAll = true;
        }
        this.carList = this.carList.concat(data.data.result);
        this.carList.forEach(item => {
          item.carImg = item.carImg.split(",")[0];
        });
        this.loading = false;
      });
    },
    remove(index) {
      this.chips.splice(index, 1);
      this._getCarList();
    },
    // reset () {
    //   this.chips = [...initChips];
    // },
    search() {
      this.params.searchVal = this.searchVal;
      this._getCarList();
      // this.chips.splice(3, 0, this.searchVal);
      // this.chips.push(this.searchVal)
    },
    okBrand() {
      this.params.brand = this.brand;
      this.openBrand = false;
      this._getCarList();
    },
    okPrice() {
      this.params.lowPrice = this.lowPrice;
      this.params.highPrice = this.highPrice;
      this.open = false;
      this._getCarList();
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.lowPrice = this.params.lowPrice;
      this.highPrice = this.params.highPrice;
      this.open = true;
    },
    openBrandBox() {
      this.brand = this.params.brand;
      this.openBrand = true;
    },
    closeBrandBox() {
      this.openBrand = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.car_list {
  overflow: hidden;
  .mu_list {
        overflow: hidden;
    .mu-avatar img {
      border-radius: 0 !important;
    }
    padding: 0;
    /deep/ .mu-item {
      height: 120px;
      padding: 0;
      padding-right: 10px;

      border-bottom: 1px silver solid;
      .mu-item-content {
        padding-top: 2px;
        padding-left: 5px;
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
  .demo-loadmore-content {
    margin-top: 85px;
    /deep/ .mu-load-more {
      min-height: 100px;
    }
  }
  .mrtop {
    margin-top: 120px !important;
  }
  .header {
    position: fixed;
    width: 100%;
    z-index: 999;
    background-color: #fff;
  }
  .shaixuan {
    /deep/ .mu-button {
      width: 50%;
    }
  }
  .chiplist {
    /deep/ .row {
      // margin: 5px 0;
    }
    .demo-chip {
      // max-width:23%;
      margin: 5px 0;
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
    top: 2px;
    right: 0px;
    z-index: 1000;
  }
  .bar6 button:before {
    // content: "搜索";
    font-size: 13px;
    // color: #f9f0da;
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
  // /deep/ .mu-item-content {
  //   margin-left: 10px;
  // }
  // .mu-avatar img {
  //   border-radius: 0 !important;
  // }
  // .mu-list {
  //   padding: 0;
  //   /deep/ .mu-item {
  //     height: 95px;
  //     padding: 0;
  //     padding-right: 10px;
  //     .mu-avatar {
  //       height: 100% !important;
  //       width: 100% !important;
  //     }
  //   }
  // }
}
</style>
