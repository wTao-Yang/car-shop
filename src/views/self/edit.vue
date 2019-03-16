<template>
  <div>
    <mu-form ref="form" :model="form" class="mu-demo-form">
      <mu-form-item label="昵称">
        <mu-text-field v-model="form.nickName" prop="username"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="手机号码">
        <mu-text-field v-model="form.phone" prop="password"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="性别">
        <mu-radio v-model="form.sex" value="0" label="男"></mu-radio>
        <mu-radio v-model="form.sex" value="1" label="女"></mu-radio>
      </mu-form-item>
      <mu-form-item label="出生日期">
        <mu-date-input v-model="form.birthday" container="bottomSheet" label-float full-width></mu-date-input>
      </mu-form-item>
      <mu-button full-width color="#42b983" @click="submit">提交</mu-button>
    </mu-form>
  </div>
</template>

<script>
import { setInfo, getInfo } from "../../api/index.js";
export default {
  data() {
    return {
      form: {
        nickName: "",
        phone: "",
        sex: "",
        birthday: "",
      }
    };
  },
  created() {
    this._getInfo();
  },
  methods: {
    _getInfo() {
      getInfo({ userName: localStorage.getItem("userName") }, data => {
        this.form = data;
      });
    },
    submit(){
      let form=this.form
      if(!form.birthday){
        form.birthday=''
      }
      if(!form.sex){
        form.sex=''
      }
      console.log(form)
      setInfo({form,userName: localStorage.getItem("userName")},data=>{
        if(data.code==0){
          this.$toast.success('修改成功')
        }
        else{
          this.$toast.error('修改失败，请稍后再试')
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.mu-demo-form {
  text-align: left;
  padding: 10px;
}
</style>
