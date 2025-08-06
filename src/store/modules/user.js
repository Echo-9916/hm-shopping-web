import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 个人权证
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      // 个人信息重置
      context.commit('setUserInfo', {})
      // 购物车重置
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}

}
