<template>
  <div class="login" v-if="show">
    <div class="login_box">
      <mu-card-title title="帐号登录"></mu-card-title>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item icon="account_circle" prop="username" :rules="usernameRules">
          <mu-text-field v-model="validateForm.username" placeholder="请输入用户名..." prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item icon="locked" prop="password" :rules="passwordRules">
          <mu-text-field
            type="password"
            v-model="validateForm.password"
            placeholder="请输入密码..."
            prop="password"
          ></mu-text-field>
        </mu-form-item>
        <div class="forget">
          <span>忘记密码？</span>
          <span @click="goIndex" style="position:relative;right:-75px">游客登录</span>
          </div>
        <!-- <mu-form-item label="姓名" prop="username" :rules="usernameRules">
          <mu-text-field v-model="validateForm.username" placeholder="请输入姓名..." prop="username"></mu-text-field>
        </mu-form-item>-->
        <!-- <mu-form-item prop="isAgree" :rules="argeeRules">
        <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
        </mu-form-item>-->
        <!-- <mu-form-item>
        </mu-form-item>-->
      </mu-form>
      <!-- <mu-container>
        <mu-text-field
          v-model="userName"
          label="UserName"
          help-text="用户名为6-12长度的字符"
          icon="account_circle"
        ></mu-text-field>
        <br>
        <mu-text-field v-model="password" label="Password" error-text="请输入密码" icon="locked"></mu-text-field>
        <br>
        <div class="forget">忘记密码？</div>
      </mu-container>-->
      <div class="button_box">
        <mu-button class="login_button" @click="login" full-width round color="success">登录</mu-button>
        <mu-button @click="register" full-width round color="success">注册</mu-button>
      </div>
    </div>
    <!-- <mu-button color="primary">Primary</mu-button>
      <mu-button color="secondary">Secondary</mu-button>
      <mu-button color="success">Success</mu-button>
      <mu-button color="warning">Warning</mu-button>
      <mu-button color="info">Info</mu-button>
      <mu-button color="error">Error</mu-button>
    <mu-button disabled>disabled</mu-button>-->
  </div>
</template>


<script>
import { login } from "../../api/index.js";
export default {
  data() {
    return {
      usernameRules: [
        { validate: val => !!val, message: "必须填写用户名" },
        { validate: val => val.length >= 6, message: "用户名长度必须大于6" },
        {
          validate: val => {
            var reg = /^[A-Za-z0-9]+$/;
            return reg.test(val);
          },
          message: "只能输入英文和数字"
        }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 6,
          message: "密码长度必须大于6"
        },
        {
          validate: val => {
            var reg = /^[A-Za-z0-9]+$/;
            return reg.test(val);
          },
          message: "只能输入英文和数字"
        }
      ],
      validateForm: {
        username: "",
        password: ""
      },
      show:false,
    };
  },
  created() {
    if (localStorage.getItem("userName") && localStorage.getItem("passWord")) {
      login(
        {
          userName: localStorage.getItem("userName"),
          passWord: localStorage.getItem("passWord")
        },
        data => {
          if (data.isSuccess) {
            this.$toast.success("登录成功");
            this.$router.push({ path: "/index" });
          } else {
            this.show = true
            this.$toast.error("帐号密码错误");
          }
        }
      );
    }else{
      this.show=true
    }
  },
  methods: {
    goIndex(){
      this.$router.push({ path: "/index" });
    },
    login() {
      this.$refs.form.validate().then(result => {
        if (result) {
          login(
            {
              userName: this.validateForm.username,
              passWord: this.validateForm.password
            },
            data => {
              if (data.isSuccess) {
                localStorage.setItem("userName", this.validateForm.username);
                localStorage.setItem("passWord", this.validateForm.password);
                this.$toast.success("登录成功");
                this.$router.push({ path: "/index" });
              } else {
                this.$toast.error("帐号密码错误");
              }
            }
          );
        }
      });
    },
    register() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background-color: #42b983;
  height: 100%;
  .login_box {
    text-align: left;
    position: relative;
    top: 20%;
    background-color: #fff;
    width: 80%;
    margin: 0 auto;
    /deep/ .mu-card-title {
      color: #42b983;
    }
    .mu-demo-form {
      padding: 10px;
    }
    .forget {
      padding-left: 32px;
      height: 20px;
      line-height: 20px;
      color: #999;
    }
  }
}
.button_box {
  padding: 10px;

  .login_button {
    margin-bottom: 10px;
  }
}
</style>
