<template>
  <div class="login">
    <div class="login_box">
      <mu-card-title title="密码修改"></mu-card-title>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item icon="account_circle" prop="username" :rules="usernameRules">
          <mu-text-field v-model="validateForm.username" placeholder="请输入用户名..." prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item icon="phone" prop="phone" :rules="phoneRules">
          <mu-text-field v-model="validateForm.phone" type="number" placeholder="电话号码"></mu-text-field>
        </mu-form-item>
      </mu-form>
      <div class="button_box">
        <!-- <mu-button class="login_button" @click="login" full-width round color="success">登录</mu-button> -->
        <mu-button @click="register" full-width round color="success">确定</mu-button>
      </div>
    </div>
  </div>
</template>


<script>
import { isForget, updatePSW } from "../../api/index.js";
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
    register() {
      this.$refs.form.validate().then(result => {
        if (result) {
          isForget(
            {
              userName: this.validateForm.username,
              phone: this.validateForm.phone
            },
            data => {
              if (data.isSuccess) {
                this.$prompt("请输入要修改的密码", "提示", {
                  validator(value) {
                    return {
                      valid: /^[A-Za-z0-9]+$/.test(value),
                      message: "只能输入英文和数字"
                    };
                  }
                }).then(({ result, value }) => {
                  if (value.length <= 6) {
                    this.$toast.error("字数必须超过6个");
                    return;
                  }
                  if (result) {
                    updatePSW(
                      { userName: this.validateForm.username, passWord: value },
                      data => {
                        if (data.isSuccess) {
                          localStorage.setItem(
                            "userName",
                            this.validateForm.username
                          );
                          localStorage.setItem("passWord", value);
                          this.$toast.message("修改成功");
                          this.$router.push({ path: "/index" });
                        } else {
                          this.$toast.error("修改失败，请稍后再试");
                        }
                      }
                    );
                  } else {
                    this.$toast.message("取消修改");
                  }
                });
              } else {
                this.$toast.error("用户名或手机号码有误");
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
