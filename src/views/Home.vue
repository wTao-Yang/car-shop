<template>
  <div class="home">
    <img alt="Vue logo" src="http://localhost:3000/baidu.gif">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="tryClick">点一下试试</button>
    <form action="http://localhost:8888/uploadheadpic">
      <input type="file" name="imgfile" id="">
      <button type="submit">提交</button>
    </form>
      <form action="http://localhost:8888/upload" method="post" enctype="multipart/form-data">
    <h2>单图上传</h2>
    <input type="file" name="logo">
    <input type="submit" value="提交">
</form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { login } from '../api/index.js'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    tryClick(){
      login({id:'aa'}, data =>{
        debugger
      })
    }
  }
}
</script>

<style scoped lang="scss">
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