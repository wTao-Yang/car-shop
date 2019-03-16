import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title:'',
    params:{
      lowPrice: "",
      highPrice: "",
      brand: "",
      searchVal: ""
    },
    open:false,
    message:"hello",
    color:"success",
  },
  mutations: {
    _message(state,message={message:'hello', color:'success'}){
      state.message=message.message;
      state.color=message.color;
      state.open=true;
    },
    openMES(state,open){
      state.open = open
    },
    changeTitle(state,title){
      state.title = title;
    },
    lowPrice(state,lowPrice){
      state.lowPrice=lowPrice
    },
    highPrice(state,highPrice){
      state.highPrice=highPrice
    },
    brand(state,brand){
      state.brand= brand
    },
    searchVal(state,searchVal){
      state.searchVal=searchVal
    }
  },
  actions: {

  }
})
