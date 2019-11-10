<template>
  <div class="login">
    <!-- 登录页面 -->
    <div class="login-container">
      <!-- 表单盒子 -->
      <div class="login-box">
        <!-- element内容 -->
        <el-form ref="loginFormRef" :model="loginForm">
          <!-- 图片 -->
          <img src="img/logo_index.png">
          <!-- 手机号 -->
          <el-form-item>
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item>
            <el-input v-model="loginForm.code" placeholder="验证码"></el-input>
          </el-form-item>
          <!-- 复选框 -->
          <el-form-item style="text-align:left">
            <el-checkbox v-model="loginForm.checked"></el-checkbox>
            <span>我已阅读并同意用户协议和隐私条款</span>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="login()">提交</el-button>
          </el-form-item>
          <!-- 结束 -->
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',

  data() {
    return {
      // 表单区
      loginForm: {
        // 手机号
        mobile: '',
        // 验证码
        code: '',
        // 协议多选
        checked: false
      }
    }
  },
  methods: {
    // 登录按钮点击事件
    login() {
      this.$router.push({name: "home"})
    }
  }
}

</script>
<style lang="less" scoped>
// 登录页面
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(img/login_bg.jpg);
  background-size: cover;
  height: 100%;

  // 表单盒子
  .login-box {
    width: 400px;
    height: 340px;
    display: flex;
    justify-content: center;
    background-color: #fff;
    align-items: center;
    text-align: center;

    // 表单
    .el-form {
      width: 75%;

      // 图片
      img {
        width: 50%;
        margin: 20px auto;
      }

      // 复选框
      .el-checkbox {
        margin-right: 10px;
      }
    }
  }
}

</style>
