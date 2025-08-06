import { Dialog } from 'vant'

export default {
  // 编写vue组件实例 配置项,可混入组件内部,优先级低于组件内配置项

  methods: {
    loginConfirm () {
      if (!this.$store.getters.token) {
        Dialog.confirm({
          title: '温馨提示',
          message: '您暂未登录，是否前往登录？',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // on confirm
            // 登陆后回弹,需要携带参数
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
          })
        return true
      }
      return false
    }
  }

}
