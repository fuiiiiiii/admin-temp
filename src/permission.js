import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

// const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (getToken()) {
    console.log(getToken())
    store.dispatch('GetInfo')
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!store.getters.userinfo) {
        store
          .dispatch('GetInfo')
          .then(res => {
            next()
          })
          .catch(err => {
            Message.error(err || '获取用户信息失败')
            next({ path: '/' })
          })
      }
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
    NProgress.done()
  }
  // if (getToken()) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //     NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
  //   } else {
  //     // if (store.getters.roles.length === 0) {
  //     //   store
  //     //     .dispatch('GetInfo')
  //     //     .then(res => {
  //     //       // 拉取用户信息
  //     //       next()
  //     //     })
  //     //     .catch(err => {
  //     //       store.dispatch('FedLogOut').then(() => {
  //     //         Message.error(err || 'Verification failed, please login again')
  //     //         next({ path: '/' })
  //     //       })
  //     //     })
  //     // } else {
  //     //   next()
  //     // }
  //     next()
  //   }
  // } else {
  //   next('/login')
  //   NProgress.done()
  // }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
