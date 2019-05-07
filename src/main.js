import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-icons/css/material-icons.scss';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import '../public/icon.css'
import 'muse-ui-message/dist/muse-ui-message.css';
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
// import Mui from 'vue-awesome-mui';

// Vue.use(Mui);

import Loading from 'muse-ui-loading';
Vue.use(Loading);
Vue.use(Message);
let config={
  time: 2000, 
}
Vue.use(Toast,config);

Vue.use(MuseUI);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// Vue.prototype.baseURL="http://localhost:8088/"
Vue.prototype.baseURL='http://47.112.4.52:8080/';

Vue.prototype.message=function(message = "hello", color = "success"){
  this.$store.commit("_message", {message:message,color:color});
}


