import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
      // redirect: '/login',
      component: () => import('@/view/layout/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/view/layout/home.vue')
        },
        {
          path: '/category',
          component: () => import('@/view/layout/category.vue')
        },
        {
          path: '/user',
          component: () => import('@/view/layout/user.vue')
        },
        {
          path: '/cart',
          component: () => import('@/view/layout/cart.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/view/login/index.vue')
    },
    {
      path: '/myorder',
      component: () => import('@/view/myorder/index.vue')
    },
    {
      path: '/pay',
      component: () => import('@/view/pay/index.vue')
    },
    {
      // 动态路由传参
      path: '/prodetail/:id',
      component: () => import('@/view/prodetail/index.vue')
    },
    {
      path: '/search',
      component: () => import('@/view/search/index.vue')
    },
    {
      path: '/searchList',
      component: () => import('@/view/search/list.vue')
    }
  ]
})
// 全局前置导航守卫
// 每个路由守卫都接收三个参数：
// to: 即将进入的目标路由对象
// from: 当前导航正要离开的路由对象
// next(): 调用该方法后，直接进入下一个路由
// next(路径): 进行拦截,跳转到指定路径

// 定义数组存储需要权限访问的界面
const authUrls = ['/myorder', '/pay']
router.beforeEach((to, from, next) => {
  // 1.判断是否需要权限访问
  if (authUrls.includes(to.path)) {
    // 2.判断是否登录
    const token = store.getters.token
    if (token) {
      // 3.登录了,直接放行
      next()
    } else {
      // 4.未登录,跳转到登录页
      next('/login')
    }
  } else {
    // 5.不需要权限访问,直接放行
    next()
  }
})

export default router
