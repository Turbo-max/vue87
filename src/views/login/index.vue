<template>
  <div class="login">
    <!-- 登录页面 -->
    <div class="login-container">
      <!-- 表单盒子 -->
      <div class="login-box">
        <!-- element内容 -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="rules">
          <!-- 图片 -->
          <img src="./img/logo_index.png">
          <!-- 手机号 -->
          <el-form-item prop="mobile" type="Number">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号">
              <i slot="prefix" class="iconfont icon-shouji"></i>
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="code">
            <el-input v-model="loginForm.code" placeholder="验证码">
              <i slot="prefix" class="iconfont icon-yanzhengma"></i>
            </el-input>
          </el-form-item>
          <!-- 复选框 -->
          <el-form-item style="text-align:left" prop="checked">
            <el-checkbox v-model="loginForm.checked"></el-checkbox>
            <span>我已阅读并同意<a href="javeScript:;">用户协议</a>和<a href="javaScript:;">隐私条款</a></span>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" :loading="is_show" :disabled="is_show" style="width:100%" @click="login()">提交</el-button>
          </el-form-item>
          <!-- 结束 -->
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// 引入 极验gt.js引入
import '@/assets/js/gt.js'
// 引入 iconfont中css代码
import '@/assets/iconfont/login/iconfont.css'

export default {
  name: 'login',

  data() {
    var check = (rule, value, callback) => {
      value ? callback() : callback(new Error('请仔细查看协议与条款'))
      // if (value) {
      //   callback()
      // } else {
      //   callback('请仔细查看协议与条款')
      // }
    }
    return {
      // 表单区
      loginForm: {
        // 手机号
        mobile: '15227429068',
        // 验证码
        code: '246810',
        // 协议多选
        checked: false,
      },
      // 提交按钮 等待效果
      is_show: false,

      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在12位手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        checked: [
          { validator: check }
        ]
      }
    }
  },
  methods: {
    // 登录按钮点击事件
    login() {
      // console.log(this.$refs.loginFormRef)
      this.$refs.loginFormRef.validate((okno) => {
        if (okno) {
          // 表单校验完毕
          // 提交按钮等待效果
          this.is_show = true
          // 极验
          this.login_axios_get()
        }
      })
    },
    // login中axios提交人机验证get请求的封装------------
    login_axios_get() {
      this.$http({
          method: 'get',
          url: '/captchas/' + this.loginForm.mobile
        })
        .then(result => {
          // 极验
          let { data } = result.data

          // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
          window.initGeetest({
            // 省略必须的配置参数
            // 以下配置参数来自服务端 SDK
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: true,
            product: 'bind'
          }, (captchaObj) => {
            captchaObj.onReady(() => {
              // 验证码ready之后才能调用verify方法显示验证码
              captchaObj.verify()
              // 提交按钮等待效果
              this.is_show = false
            }).onSuccess(() => {
              // your code
              // 登录home页面
              this.login_axios_post()
            }).onError(() => {
              // your code
            })
          });

        })
        .catch(err => {
          console.log(err)
          // element弹框
          return this.$message.error('获得人机秘钥信息有错误:' + err);
        })
    },
    // login中axios提交post请求的封装-----------
    login_axios_post() {
      // axios请求校验
      this.$http({
          method: 'post',
          url: '/authorizations',
          data: {
            mobile: this.loginForm.mobile,
            code: this.loginForm.code
          }
        })
        .then(result => {
          // 秘钥的存储 sessionstoring
          // console.log(result)
          window.sessionStorage.setItem('loginData', JSON.stringify(result.data.data))
          this.$router.push({ name: 'home' })
        })
        .catch(err => {
          console.log(err)
          // return alert('用户名或密码错误')
          return this.$message.error('手机号或密码错误！！！'); // element弹框
        })
      // this.$router.push({ name: 'home' })
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
