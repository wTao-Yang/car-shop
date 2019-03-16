<template>
  <div class="login">
    <div class="login_box">
      <mu-card-title title="帐号注册"></mu-card-title>
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
        <mu-form-item icon="phone" prop="phone" :rules="phoneRules">
          <mu-text-field v-model="validateForm.phone" type="number" placeholder="电话号码"></mu-text-field>
        </mu-form-item>
      </mu-form>
      <!-- <mu-form-item label="姓名" prop="username" :rules="usernameRules">
          <mu-text-field v-model="validateForm.username" placeholder="请输入姓名..." prop="username"></mu-text-field>
      </mu-form-item>-->
      <!-- <mu-form-item prop="isAgree" :rules="argeeRules">
        <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
      </mu-form-item>-->
      <!-- <mu-form-item>
      </mu-form-item>-->
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
        <!-- <mu-button class="login_button" @click="login" full-width round color="success">登录</mu-button> -->
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
import { register } from "../../api/index.js";
export default {
  data() {
    return {
      userName: "",
      password: "",
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
      phoneRules: [
        { validate: val => !!val, message: "必须填写手机号码" },
        {
          validate: val => {
            var reg = /^1[34578]\d{9}$/;
            return reg.test(val);
          },
          message: "请输入正确的手机号码"
        }
      ],
      validateForm: {
        username: "",
        password: "",
        phone: ""
      }
    };
  },
  methods: {
    openMess() {
      this.message("aaaa", "info");
    },
    register() {
      this.$refs.form.validate().then(result => {
        if (result) {
          register(
            {
              userName: this.validateForm.username,
              passWord: this.validateForm.password,
              phone: this.validateForm.phone
            },
            data => {
              if (data.isSuccess) {
                localStorage.setItem('userName',this.validateForm.username)
                localStorage.setItem('passWord',this.validateForm.password)
                this.$toast.success("注册成功");
                this.$router.push({ path: "/index" });
              } else {
                this.$toast.error("该用户名已被占用");
              }
            }
          );
        }
      });
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
