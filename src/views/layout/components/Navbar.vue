<template>
  <el-menu class="navbar"
           mode="horizontal">
    <hamburger :toggle-click="toggleSideBar"
               :is-active="sidebar.opened"
               class="hamburger-container" />
    <breadcrumb />
    <el-dropdown class="avatar-container"
                 trigger="click">
      <div class="avatar-wrapper">
        <div class="user-name-bor">
          <img :src="avatar+'?imageView2/1/w/80/h/80'"
               class="user-avatar">
          <span class="user-name">{{ userInfo.username }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
      </div>
      <el-dropdown-menu slot="dropdown"
                        class="user-dropdown">
        <router-link class="inlineBlock"
                     to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;"
                @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        // this.$router.push('/login')
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  padding-bottom: 1px;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      // margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 20px;
        font-size: 12px;
      }
    }
  }
}
.user-name-bor {
  display: flex;
  align-items: center;
  .user-name {
    margin: 0px 0px 0px 10px;
    font-weight: 700;
  }
}
</style>

