import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-message/dist/muse-ui-message.css';
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
Vue.use(Message);
Vue.use(Toast);

Vue.use(MuseUI);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.message=function(message = "hello", color = "success"){
  this.$store.commit("_message", {message:message,color:color});
}
