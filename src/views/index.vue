<template>
  <div class="index">
    <mu-appbar style="width: 100%;position:fixed" color="#42b983">
      <!-- <mu-button icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>-->
      {{ title }}
      <!-- <mu-menu slot="right">
        <mu-button flat>MEMU</mu-button>
        <mu-list slot="content">
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title>Menu Item 1</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title>Menu Item 2</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>-->
    </mu-appbar>
    <div style="height: 56px"></div>
    <router-view class="view"/>
    <div style="height: 56px"></div>
    <mu-bottom-nav :value.sync="title" style="position: fixed;bottom: 0;width: 100%">
      <mu-bottom-nav-item value="首页" title="首页" icon="home" to="/index"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="买车" title="买车" icon="directions_car" to="/carList"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="卖车" title="卖车" icon="airport_shuttle" to="/soldCar"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="个人" title="个人" icon="person" to="/self"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { login } from "../api/index.js";

export default {
  name: "index",
  components: {
    HelloWorld
  },
  data() {
    return {
      title: this.$route.name
    };
  },
  created() {
    // if (localStorage.getItem("title")) {
    //   this.title = localStorage.getItem("title");
    // } else {
    //   this.title = "首页";
    //   localStorage.setItem("title", "首页");
    // }
  },
  beforeDestroy() {
    // localStorage.removeItem("title");
  },
  watch: {
    $route(to){
      // debugger
      this.title=to.name;
    }
  },
  methods: {
    tryClick() {
      login({ id: "aa" }, data => {
        debugger;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.view {
  max-height: calc(100% - 90px);
  overflow: auto;
  overflow-x: hidden;
}
/deep/ h3 {
  margin: 40px 0 0;
  color: #666;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>