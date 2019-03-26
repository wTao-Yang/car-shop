<template>
  <div class="car_list">
    <mu-load-more @refresh="_getApply" :refreshing="loading">
      <mu-list class="mu_list" textline="two-line" v-if="carList.length!=0||outList.length!=0">
        <mu-expansion-panel v-for="(item,index) in carList" :key="index">
          <div slot="header" class="header">
            <mu-list-item>
              <mu-list-item-action>
                <div class="info_label">车主姓名</div>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ item.name }}</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-list-item>
              <mu-list-item-action>
                <div class="info_label">车辆品牌</div>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ item.brand }}</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-list-item>
              <mu-list-item-action>
                <div class="info_label">车辆价格</div>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ item.price }}万元</mu-list-item-title>
              </mu-list-item-content>
              <div style="color:#42b983">审核中</div>
            </mu-list-item>
          </div>
          <!-- <mu-button slot="action" flat>Cancel</mu-button> -->
          <mu-button slot="action" @click="cancel(item.applyId)" flat color="success">取消预约</mu-button>
        </mu-expansion-panel>
        <div style="height:10px"></div>
        <div v-for="(item) in outList" :key="item.applyId" class="outItem">
          <mu-list-item>
            <mu-list-item-action>
              <div class="info_label">车主姓名</div>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{ item.name }}</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item>
            <mu-list-item-action>
              <div class="info_label">车辆品牌</div>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{ item.brand }}</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item>
            <mu-list-item-action>
              <div class="info_label">车辆价格</div>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{ item.price }}万元</mu-list-item-title>
            </mu-list-item-content>
            <div style="color:red">{{ statusList[item.status] }}</div>
          </mu-list-item>
        </div>
      </mu-list>
      <div v-else style="padding-top:100px">暂时没有申请</div>
    </mu-load-more>
  </div>
</template>
<script>
import { getApply, cancelApply } from "../../api/index.js";
export default {
  data() {
    return {
      loading: false,
      carList: [],
      outList: [],
      statusList: ["审核中", "已取消", "已通过", "已拒绝"]
    };
  },
  created() {
    this._getApply();
  },
  methods: {
    cancel(id) {
      this.$confirm("确定要取消申请？", "提示", {
        type: "warning"
      }).then(({ result }) => {
        if (result) {
          cancelApply({ applyId: id }, data => {
            if (data.isSuccess) {
              this.$toast.success("取消申请");
            } else {
              this.$toast.error("取消申请失败，请稍后再试");
            }
            this._getApply();
          });
        } else {
        }
      });
    },
    _getApply() {
      this.loading = true;
      let self = this;
      getApply(
        { userName: localStorage.getItem("userName"), status: 0 },
        data => {
          if (data.code == 0) {
            this.carList = [];
            this.outList = [];
            data.result.forEach(item => {
              if (item.status == 0) {
                self.carList.push(item);
              } else {
                self.outList.push(item);
              }
            });
            // this.carList = data.result;
          } else {
            this.$toast.error("网络错误");
          }
          this.loading = false;
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.car_list {
  .header {
    width: 90%;
  }
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
      margin-bottom: 5px;
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
      height: 50px;
    }
    .mu-item-content {
      padding-left: 30px;
    }
  }
}
</style>
