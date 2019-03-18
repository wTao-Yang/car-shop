<template>
  <div class="car_list">
    <mu-load-more @refresh="_getApply" :refreshing="loading">
      <mu-list class="mu_list" textline="two-line" v-if="carList.length!=0">
        <mu-expansion-panel v-for="(item,index) in carList" :key="index">
          <div slot="header">
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
        </mu-list-item>
          </div>
          <!-- <mu-button slot="action" flat>Cancel</mu-button> -->
          <mu-button slot="action" @click="cancel(item.applyId)" flat color="success">取消预约</mu-button>
        </mu-expansion-panel>
      </mu-list>
      <div v-else style="padding-top:100px">暂时没有申请</div>
    </mu-load-more>
  </div>
</template>
<script>
import { getApply,cancelApply } from "../../api/index.js";
export default {
  data() {
    return {
      loading: false,
      carList: []
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
          cancelApply(
            { applyId:id },
            data => {
              if (data.isSuccess) {
                this.$toast.success("取消申请");
              } else {
                this.$toast.error("取消申请失败，请稍后再试");
              }
              this._getApply();
            }
          );
        } else {
        }
      });
    },
    _getApply() {
      this.loading = true;
      getApply({ userName: localStorage.getItem("userName"),status:0 }, data => {
        if (data.code == 0) {
          this.carList = data.result;
        } else {
          this.$toast.error("网络错误");
        }
        this.loading = false;
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.car_list {
    .header{
        padding-left: 20px;
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
    /deep/ .mu-expansion-panel-header,
    /deep/ .mu-expansion-panel-content {
      padding: 0;
    }
    /deep/ .mu-item-wrapper {
      top: -21px;
    }
    /deep/ .mu-item,li{
        height: 50px;
    }
    .mu-item-content{
        padding-left: 30px;
    }
  }
}
</style>
