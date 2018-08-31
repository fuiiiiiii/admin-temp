<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :show-timeout="200"
             :default-active="$route.path"
             :collapse="isCollapse"
             mode="vertical"
             background-color="#304156"
             text-color="#bfcbd9"
             active-text-color="#409EFF">
      <sidebar-item v-for="item in menu"
                    :key="item.name"
                    :item="item"
                    :base-path="item.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Cookies from 'js-cookie'
import { mapMutations } from 'vuex'
export default {
  components: { SidebarItem },

  computed: {
    ...mapGetters([
      'sidebar',
      'menu',
      'userInfo'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  mounted () {
    if (this.userInfo) {
      if (Cookies.get(this.userInfo.username)) {
        var menuStr = Cookies.get(this.userInfo.username)
        this.SET_MENU(JSON.parse(menuStr))
      } else {
        this.$store.dispatch('Set_Menu')
      }
    } else {
      this.$store.dispatch('Set_Menu')
    }
  },
  methods: {
    ...mapMutations([
      'SET_MENU'
    ])
  }
}
</script>
