import Cookies from 'js-cookie'
// import axios from '@/utils/request'
// import store from '../index'
import { menujson } from '@/assets/menuJson'
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    menu: {}
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_MENU: (state, list) => {
      state.menu = list
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    // =======================获取菜单栏=======================
    Set_Menu({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_MENU', JSON.parse(JSON.stringify(menujson.list)))
        // axios
        //   .get('/fuiii')
        //   .then(res => {
        //     commit('SET_MENU', res.data.list)
        //     if (store.getters.userInfo) {
        //       Cookies.set(store.getters.userInfo.username, res.data.list, {
        //         expires: 30
        //       })
        //     }
        //     resolve(res)
        //   })
        //   .catch(err => {
        //     reject(err)
        //     console.log(err)
        //   })
      })
    }
  }
}

export default app
