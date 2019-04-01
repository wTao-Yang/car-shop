<template>
  <div class="home">
    <!-- <div class="search_bar">
      <input type="text" class="search_text">
      <span class="search_icon">
        <mu-icon value="search" color="blue"></mu-icon>
      </span>
    </div>-->
    <div class="search bar6">
      <input type="text" placeholder="搜索您要的车" v-model="searchVal">
      <mu-button color="#42b983" @click="search">
        <mu-icon left value="search "></mu-icon>
        <span>搜索</span>
      </mu-button>
    </div>
    <mu-carousel hide-controls>
      <mu-carousel-item v-for="(item,index) in imgList" :key="index">
        <img @click="goNew(item.carId)" :src="item.img">
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
    <mu-flex class="button-wrapper">
      <mu-sub-header>热门品牌</mu-sub-header>
      <mu-button color="success" @click="goCarList(item.hotBrand)" large v-for="(item,index) in hotBrand" :key="index">
        <mu-icon left value="whatshot"></mu-icon><span class="hot_brand">{{ item.hotBrand }}</span>
      </mu-button>
      <!-- <mu-button color="success" large>
        <mu-icon left value="whatshot"></mu-icon><span></span>
      </mu-button>
      <mu-button color="success" large>
        <mu-icon left value="whatshot"></mu-icon><span></span>
      </mu-button>
      <mu-button color="success" large>
        <mu-icon left value="whatshot"></mu-icon><span></span>
      </mu-button> -->
    </mu-flex>
    <div class="car_list">
      <mu-sub-header>热门车型</mu-sub-header>
      <mu-list textline="three-line">
        <mu-list-item @click="goDetail(item.carId)" v-for="(item,index) in carList" :key="index" avatar :ripple="false" button>
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
          </mu-list-item-action> -->
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { getHot,getHotBrand,getWheel } from "../../api/index.js";
import axios from "axios";
export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      selects: "",
      searchVal: "",
      imgList: [
        // "http://localhost:3000/images/yfnd.jpg",
        // "http://localhost:3000/images/yfnd2.jpg",
        // "http://localhost:3000/images/yfnd3.jpg"
      ],
      carList:[],
      hotBrand:[]
    };
  },
  created() {
    localStorage.setItem("title", "首页");
    this._getList()
    this._getWheel()
    this._getHotBrand()
  },
  methods: {
    goNew(link){
      location.href = link
    },
    // goDetail(){
    //   this.$router.push({ path: "/carDetail", query: { id: id } });
    // },
    _getHotBrand(){
      getHotBrand({},data=>{
        this.hotBrand=data.data.result;
      })
    },
    _getWheel(){
      getWheel({},data=>{
        this.imgList=data.data.result;
      })
    },
    _getList(){
      getHot({},data=>{
        this.carList = data.data.result;
        this.carList.forEach(item=>{
          item.carImg=item.carImg.split(',')[0]
        })
        // console.log(this.carList.carImg)
        // this.carList.carImg = this.carList.carImg.split(',')[0]
      })
    },
    goDetail(id){
      this.$router.push({ path: "/carDetail", query: { id: id } });
    },
    saveReport() {
      let formData = new FormData();
      let file=document.getElementById('image');
      formData.append('logo',this.$refs.img.files[0])
      // console.log(file.files[0])
      // console.log(this.$refs.img.files[0])
      // formData.append()
      axios.post("http://localhost:8887/upload", formData,{headers:{'Content-Type': 'multipart/form-data'}}).then(result => {
        if(result.data.code){
          this.$toast.success("上传成功");
        }else{
          this.$toast.error("上传失败");
        }
     });
      return false
    },
    goCarList(brand){
      this.$router.push({
        path: "/carList",
        query: { brand: brand }
      });
    },
    search() {
      this.$router.push({
        path: "/carList",
        query: { searchVal: this.searchVal }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  .hot_brand{
    width: 100%;
    display: inline-block;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
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
      .mu-item-content{
        padding-top: 2px;
      }
      .mu-avatar {
        height: 100% !important;
        width: 138px !important;
        img{
                  height: 100% !important;
        width: 138px !important;
        }
      }
      .mu-item-title{
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
      .mu-item-sub-title{
        color:#999;
      }
      .price{
        color: red;
        font-weight: bold;
        font-size: 20px;
      }
    }
  }
}
</style>