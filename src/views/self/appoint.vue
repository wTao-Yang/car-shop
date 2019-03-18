<template>
  <div class="car_list">
    <mu-load-more @refresh="_getAppoint" :refreshing="loading">
      <mu-list class="mu_list" textline="two-line" v-if="carList.length!=0">
        <mu-expansion-panel v-for="(item,index) in carList" :key="index">
          <div slot="header">
            <mu-list-item @click="goDetail(item.carId)" avatar :ripple="false" button>
              <mu-avatar>
                <img :src="item.carImg">
              </mu-avatar>
              <mu-list-item-content>
                <mu-list-item-title>{{ item.carTitle }}</mu-list-item-title>
                <mu-list-item-sub-title>{{ `${item.buyTime}/${item.mileage}万公里` }}</mu-list-item-sub-title>
                <mu-list-item-sub-title class="price">{{ item.price }}万元</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </div>
          <!-- <mu-button slot="action" flat>Cancel</mu-button> -->
          <mu-button slot="action" @click="cancel(item.carId)" flat color="success">取消预约</mu-button>
        </mu-expansion-panel>
      </mu-list>
      <div v-else style="padding-top:100px">暂时没有预约</div>
    </mu-load-more>
  </div>
</template>
<script>
import { getAppoint, appoint } from "../../api/index.js";
export default {
  data() {
    return {
      loading: false,
      carList: []
    };
  },
  created() {
    this._getAppoint();
  },
  methods: {
    cancel(id) {
      this.$confirm("确定要取消预约？", "提示", {
        type: "warning"
      }).then(({ result }) => {
        if (result) {
          appoint(
            { userName: localStorage.getItem("userName"), carId: id,status:1 },
            data => {
              if (data.code==0) {
                this.$toast.success("取消预约");
              } else {
                this.$toast.error("取消预约失败，请稍后再试");
              }
              this._getAppoint();
            }
          );
        } else {
        }
      });
    },
    _getAppoint() {
      this.loading = true;
      getAppoint({ userName: localStorage.getItem("userName"),status:0 }, data => {
        if (data.code == 0) {
          this.carList = data.result;
          this.carList.forEach(item => {
            item.carImg = item.carImg.split(",")[0];
          });
        } else {
          this.$toast.error("网络错误");
        }
        this.loading = false;
      });
    },
    goDetail(id) {
      this.$router.push({ path: "/carDetail", query: { id: id } });
    }
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
    overflow: hidden;
    /deep/ .mu-expansion-panel-header,
    /deep/ .mu-expansion-panel-content {
      padding: 0;
    }
    /deep/ .mu-item-wrapper {
      top: -21px;
    }
    /deep/ .mu-item,
    li {
      height: 120px;
      padding: 0;
      padding-right: 10px;
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
