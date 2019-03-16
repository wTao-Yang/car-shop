<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>-->
    <router-view/>
    <mu-snackbar :color="color.color" :open.sync="color.open">
      <mu-icon left :value="icon"></mu-icon>
      {{color.message}}
      <mu-button flat slot="action" color="#fff" @click="color.open = false">Close</mu-button>
    </mu-snackbar>
  </div>
</template>
<script>
import './assets/common.js'
export default {
  data() {
    return {};
  },
  computed: {
    icon() {
      return {
        success: "check_circle",
        info: "info",
        warning: "priority_high",
        error: "warning"
      }[this.color.color];
    },
    color(val) {
      return {
        color: this.$store.state.color,
        message: this.$store.state.message,
        open: this.$store.state.open,
        timeout: 3000
      };
    },
    open() {
      return this.$store.state.open;
    }
  },
  watch: {
    open(val) {
      if (val) {
        if (this.color.timer) clearTimeout(this.color.timer);
        this.color.timer = setTimeout(() => {
          this.$store.commit("openMES", false);
        }, this.color.timeout);
      }
    }
  },
  methods: {
    openMess() {
      this.$toast.success('hello world');
    },
    openColorSnackbar() {
      if (this.color.timer) clearTimeout(this.color.timer);
      this.color.open = true;
      this.color.timer = setTimeout(() => {
        this.color.open = false;
      }, this.color.timeout);
    }
  }
};
</script>


<style lang="scss">
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // background-color: #fff;
}
.divider {
  height: 10px;
  background-color: #fafafa;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
