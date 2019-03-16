<template>
  <div>
    <mu-container>
      <mu-text-field
        v-model="suggestion"
        placeholder="请写下您的宝贵建议，我们会争取做得更好！"
        multi-line
        :rows="10"
        full-width
      ></mu-text-field>
      <mu-button color="#42b983" full-width @click="_setSuggest">提交</mu-button>
    </mu-container>
  </div>
</template>

<script>
import { setSuggest } from "../../api/index.js";
export default {
  data() {
    return {
      suggestion: ""
    };
  },
  methods:{
    _setSuggest(){
      if(this.suggestion==''){
        this.$toast.error('未输入建议！')
        return
      }
      setSuggest({userName:localStorage.getItem('userName'),suggestion:this.suggestion},data=>{
        if(data.code==0){
          this.$toast.success('提交成功')
          this.$router.push({path: '/self'})
        }else{
          this.$toast.error('提交失败，请稍后再试')
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20px;
}
</style>
