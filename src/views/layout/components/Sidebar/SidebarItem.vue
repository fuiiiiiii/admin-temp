<template>
  <div class="menu-wrapper">
    <!-- =========================一级菜单（有子菜单）=================================== -->
    <template v-if="!haveChildre(item)">
      <el-menu-item :key="item.name"
                    :index="item.name">
        <template slot="title">
          <i :class="item.iconCls" />
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- =========================一级菜单（有子菜单）=================================== -->
    <template v-else>
      <el-submenu :key="item.name"
                  :index="item.name">
        <template slot="title">
          <i :class="item.iconCls" />
          <span>{{ item.name }}</span>
        </template>
        <!-- 二级子菜单 -->
        <el-menu-item v-for="chil in item.children"
                      :key="chil.name"
                      :index="chil.name">
          <template slot="title">
            <router-link :to="chil.path">
              {{ chil.name }}
            </router-link>
          </template>
        </el-menu-item>
      </el-submenu>
    </template>

  </div>
</template>

<script>
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route配置json
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      onlyOneChild: null
    }
  },
  mounted () {
  },
  methods: {
    haveChildre (item) {
      if (item.children) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
