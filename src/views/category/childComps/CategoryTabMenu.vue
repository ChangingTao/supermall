<template>
  <scroll id="tab-menu">
    <div class="menu-list-item"
         v-for="(item, index) in categories"
         :class="{active:index === currentIndex}"
         @click="itemClick(index)">
      {{item.title}}
    </div>
  </scroll>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "CategoryTabMenu",
    components: {Scroll},
    props: {
      categories: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('selectItem', index)
      }
    }
  }
</script>

<style scoped>
  #tab-menu {
    background-color: rgb(246, 246, 246);
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
