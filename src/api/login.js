
import request from '@/utils/request'
// 1.获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}
// 2.获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha',
    {
      captchaCode,
      captchaKey,
      mobile
    }
  )
}
// 3.登录接口
export const codeLogin = (smsCode, mobile) => {
  return request.post('/passport/login', {
    form: {
      smsCode,
      mobile,
      isParty: false,
      partyData: {}
    }
  })
}
