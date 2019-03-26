<template>
  <div class="car_list">
    <mu-load-more @refresh="_getAppoint" :refreshing="loading">
      <mu-list class="mu_list" textline="two-line" v-if="carList.length!=0 || outList.length!=0">
        <mu-expansion-panel v-for="(item,index) in carList" :key="index">
          <div slot="header">
            <mu-list-item @click="goDetail(item.carId)" avatar :ripple="false" button>
              <mu-avatar>
                <img :src="item.carImg">
              </mu-avatar>
              <mu-list-item-content>
                <mu-list-item-title>{{ item.carTitle }}</mu-list-item-title>
                <mu-list-item-sub-title>{{ `${item.buyTime}/${item.mileage}万公里` }}</mu-list-item-sub-title>
                <mu-list-item-sub-title class="flex">
                  <span class="price">{{ item.price }}万元</span>
                  <span class="status">{{ statusList[item.apStatus] }}</span>
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </div>
          <!-- <mu-button slot="action" flat>Cancel</mu-button> -->
          <mu-button slot="action" @click="cancel(item.carId)" flat color="success">取消预约</mu-button>
        </mu-expansion-panel>
        <mu-list-item
          class="outItem"
          @click="goDetail(item.carId)"
          avatar
          :ripple="false"
          button
          v-for="(item) in outList"
          :key="item.carId"
        >
          <mu-avatar>
            <img :src="item.carImg">
          </mu-avatar>
          <mu-list-item-content>
            <mu-list-item-title>{{ item.carTitle }}</mu-list-item-title>
            <mu-list-item-sub-title>{{ `${item.buyTime}/${item.mileage}万公里` }}</mu-list-item-sub-title>
            <mu-list-item-sub-title class="flex">
              <span class="price">{{ item.price }}万元</span>
              <span class="status" style="color:red">{{ statusList[item.apStatus] }}</span>
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
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
      carList: [],
      statusList: ["审核中", "已取消", "已通过", "已拒绝"],
      outList: []
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
            {
              userName: localStorage.getItem("userName"),
              carId: id,
              status: 1
            },
            data => {
              if (data.code == 0) {
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
      let self = this;
      getAppoint(
        { userName: localStorage.getItem("userName"), status: 0 },
        data => {
          if (data.code == 0) {
            this.carList = [];
            this.outList = [];
            data.result.forEach(item => {
              item.carImg = item.carImg.split(",")[0];
              if (item.apStatus == 0) {
                self.carList.push(item);
              } else {
                self.outList.push(item);
              }
            });
            // this.carList = data.result;
            // this.outList = data.result;
            // this.carList.forEach(item => {
            //   item.carImg = item.carImg.split(",")[0];
            // });
            //           this.outList.forEach(item => {
            //   item.carImg = item.carImg.split(",")[0];
            // });
          } else {
            this.$toast.error("网络错误");
          }
          this.loading = false;
        }
      );
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
    .outItem {
      // border-bottom: 1px solid #999;
      padding-right: 10%;
      background-color: #fff;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    }
    /deep/ .mu-expansion-panel-header,
    /deep/ .mu-expansion-panel-content {
      padding: 0;
    }
    /deep/ .mu-item-wrapper {
      // top: -21px;
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
        display: flex;
        justify-content: space-between;
      }
      .price {
        color: red;
        font-weight: bold;
        font-size: 20px;
      }
      .status {
        color: #42b983;
        line-height: 30px;
      }
      .status1 {
        color: red;
      }
    }
  }
}
</style>
