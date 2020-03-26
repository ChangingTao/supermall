<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <icon></icon>
    <svg-icon></svg-icon>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from '@/components/content/MainTabBar/MainTabBar'
  import Icon from 'components/content/Icon/Icon'
  import SvgIcon from 'components/content/Icon/svg'
  export default {
    name: 'App',
    components: {
      MainTabBar
      ,SvgIcon,
      Icon
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
