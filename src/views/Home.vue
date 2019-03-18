<template>
  <div class="home">
    <form name="uploadForm" 
    id="uploadForm" 
    method="post" 
    enctype="multipart/form-data" 
    action="http://localhost:8886/upload" 
    target="uploadFrame">
    <p style="margin:10px 0;">上传图片:
        <input type="text" name="name" value="xiangheng">
        <input type="file" name="imageFile" multiple="multiple"/>
        <input type="submit" id="fileSubmit" value="上传" />
    </p>
</form>
    <img alt="Vue logo" src="http://localhost:3000/baidu.gif">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="tryClick">点一下试试</button>
    <form
      ref="form"
      method="post"
      enctype="multipart/form-data"
      onsubmit="return false"
    >
      <input ref="img"  type="file" name="logo" multiple="multiple">
      <input type="button" @click="tryClick" value="提交">
    </form>
      <form action="http://localhost:8088/uploads" method="post" enctype="multipart/form-data">
    <h2>单图上传</h2>
    <input type="file" name="imageFile" multiple="multiple">
    <input type="hidden" name="carId" value="1231414" >
    <input type="submit" value="提交">
</form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { login } from '../api/index.js'
import axios from  'axios'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
 tryClick(){
      let formData = new FormData();
      // let file = document.getElementById("image");
      debugger
      formData.append("imageFile", this.$refs.img.files);
      // formData.append("userName", localStorage.getItem("userName"));
      formData.append("carId", '1231414');
      axios
        .post("http://localhost:8088/uploads", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(result => {
          if (result.data.code == 0) {
            this.$toast.success("上传成功");
          } else {
            this.$toast.error("上传失败");
          }
        });
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