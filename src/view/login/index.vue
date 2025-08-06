<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.back()" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" alt="" @click='getPicCode'>
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{ second === totalSecond ?'获取验证码' : `重新发送(${second})秒`}}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
import { Notify } from 'vant'

// import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  data () {
    return {
      mobile: '', // 用户输入的手机号
      picCode: '', // 用户输入的图形验证码
      smsCode: '', // 用户输入的短信验证码
      picKey: '', // 图片验证码的key
      picUrl: '', // 图片验证码的url
      totalSecond: 60, // 总秒数
      second: 60, // 剩余秒数
      timer: null // 定时器
    }
  },
  // 进入页面时获取图片验证码
  created () {
    this.getPicCode()
  },
  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    // 获取图片验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      // console.log(res.data)
      this.picKey = key
      this.picUrl = base64
    },
    // 校验
    vaildFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      if (!this.vaildFn()) return
      // 定时器没开,同时秒数为60 才可以启用
      if (!this.timer && this.second === this.totalSecond) {
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信验证码发送成功')
        setTimeout(() => {
          Notify({ type: 'success', message: res.message })
        }, 3000)
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null // 重置
            this.second = this.totalSecond// 归位
          }
        }, 1000)
      }
    },
    // 登录
    async login () {
      if (!this.vaildFn()) return
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确的短信验证码')
        return
      }
      const res = await codeLogin(this.smsCode, this.mobile)
      // console.log(res)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')

      const url = this.$route.query.backUrl || '/home'
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
