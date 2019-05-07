<template>
  <div class="self">
    <div v-if="show">
      <div class="self_card">
        <img @click="openImg" :src="baseURL+info.headPic" alt>
        <div>昵称：{{ info.nickName }}</div>
        <div>注册时间：{{ info.registerDay }}</div>
      </div>
      <mu-paper :z-depth="2">
        <mu-list>
          <mu-list-item @click.native="goApply">
            <mu-list-item-action>
              <mu-icon value="view_list"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>卖车申请</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item @click.native="goAppoint">
            <mu-list-item-action>
              <mu-icon value="list"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>预约列表</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item @click.native="goMySold">
            <mu-list-item-action>
              <mu-icon value="airport_shuttle"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>卖车情况</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item @click.native="goCollection">
            <mu-list-item-action>
              <mu-icon value="star"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>我的收藏</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item @click.native="goEdit">
            <mu-list-item-action>
              <mu-icon value="edit"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>信息编辑</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item @click.native="goHelp">
            <mu-list-item-action>
              <mu-icon value="help_outline"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>意见反馈</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item @click.native="exit">
            <mu-list-item-action>
              <mu-icon value="power_settings_new"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>退出登录</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </div>
    <div v-else>
      <div class="self_card">
        <img src="../../assets/images/headpic.jpg" alt>
        <div>未登录</div>
      </div>
      <mu-button @click="goLogin" style="width:80%" color="#42b983" round>请登录...</mu-button>
    </div>
    <form
      style="display:none"
      ref="form"
      method="post"
      enctype="multipart/form-data"
      onsubmit="return false"
    >
      <input ref="img" @change="isHasFile" type="file" name="logo">
      <!-- <input type="button" @click="saveReport" value="提交"> -->
    </form>
  </div>
</template>
<script>
import { getInfo,upload } from "../../api/index.js";
export default {
  data() {
    return {
      show: false,
      info: {}
    };
  },
  created() {
    localStorage.setItem("title", "个人");
    if (localStorage.getItem("userName")) {
      this.show = true;
      this._getInfo();
    }
  },
  methods: {
    _getInfo() {
      getInfo({ userName: localStorage.getItem("userName") }, data => {
        this.info = data;
      });
    },
    isHasFile() {
      if (this.$refs.img.files[0]) {
        this.$confirm("确定要修改头像？", "提示", {
          type: "warning"
        }).then(({ result }) => {
          if (result) {
            this.saveReport();
          } else {
            this.$toast.message("取消上传");
          }
        });
      }
    },
    openImg() {
      this.$refs.img.click();
    },
    saveReport() {
      let formData = new FormData();
      let file = document.getElementById("image");
      formData.append("imageFile", this.$refs.img.files[0]);
      formData.append("userName", localStorage.getItem("userName"));
      upload(formData,data=>{
        if (data.code == 0) {
          this._getInfo();
          this.$toast.success("上传成功");
        } else {
          this.$toast.error("上传失败");
        }
      })
      this.$refs.img.values = "";
      this.$refs.img.outerHTML = this.$refs.img.outerHTML;
      return false;
    },
    goApply() {
      this.$router.push({ path: "/apply" });
    },
    goAppoint() {
      this.$router.push({ path: "/appoint" });
    },
    goEdit() {
      this.$router.push({ path: "/edit" });
    },
    goHelp() {
      this.$router.push({ path: "/help" });
    },
    goCollection() {
      this.$router.push({ path: "/collection" });
    },
    goMySold() {
      this.$router.push({ path: "/mySold" });
    },
    exit() {
      localStorage.removeItem("userName");
      localStorage.removeItem("passWord");
      this.$router.push({ path: "/" });
    },
    goLogin() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style lang="scss" scoped>
.self {
  .self_card {
    height: 200px;
    text-align: center;
    img {
      margin-top: 30px;
      width: 100px;
      height: 100px;
            min-width: 100px;
      min-height: 100px;
      border-radius: 50%;
    }
    .text {
      width: 100px;
    }
  }
}
</style>

