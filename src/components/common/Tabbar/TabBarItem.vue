<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle" :class="{active: isActive}">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    data() {
      return {
        // isActive: false
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    props:{
      path: String,
      activeColor: {
        type: String,
        default: 'pink'
      }
    },
    methods: {
      itemClick(){
        this.$router.replace(this.path);
      }

    }
  }
</script>

<style scoped>

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;

    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    /* 将图片底部默认的3px去除 */
    vertical-align: middle;
  }
</style>
